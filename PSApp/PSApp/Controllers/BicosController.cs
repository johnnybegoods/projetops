using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PSApp.Model;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using PSApp.DataBase;
using System.Data.SqlClient;
using System.Data;
using Newtonsoft.Json.Converters;
using System.Globalization;
using System.Threading;

namespace PSApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BicosController : ControllerBase
    {
        // GET: api/Bicos
        [HttpGet]
        public async Task<string> Get()
        {

            SyncAfericao();


            try
            {
                string bicosString = await GetDadosApi(Util.ENUM.END_POINT_BICOS);

                ListaBicos bicos = JsonConvert.DeserializeObject<ListaBicos>(bicosString);

                List<Bico> SyncList = DataBase.BicoDAO.Sync(bicos.Bicos);

                if (SyncList != null)
                {
                    return JsonConvert.SerializeObject(SyncList);
                }
                else
                {
                    Util.WriteLog.Write("ERRO AO SINCRONIZAR LISTA - NENHUM REGISTRO NO BANCO LOCAL", Util.ENUM.LOG_FILENAME_SYSTEM);
                    return null;
                }
            }catch(System.ArgumentNullException ex)
            {
                Util.WriteLog.Write("" + ex, Util.ENUM.LOG_FILENAME_SYSTEM);
                string query = "SELECT * FROM bico";
                return JsonConvert.SerializeObject(BicoDAO.GetData(query));
            }catch(HttpRequestException ex)
            {
                Util.WriteLog.Write("" + ex, Util.ENUM.LOG_FILENEMA_HTTP);
                string query = "SELECT * FROM bico";
                return JsonConvert.SerializeObject(BicoDAO.GetData(query));
            }
        }

        // GET: api/Bico/5
        [HttpGet("{id}", Name = "GetById")]
        public async Task<string> Get(int id)
        {
            
            try
            {
                string abastcimentoString = await GetDadosApi(Util.ENUM.END_PONINT_ABASTECIMENTOS + id);

                CultureInfo provider = CultureInfo.InvariantCulture;

                ListaAbastecimentos abastecimentos =
                    JsonConvert.DeserializeObject<ListaAbastecimentos>(abastcimentoString, new IsoDateTimeConverter { DateTimeFormat = "dd/MM/yyyy HH:mm:ss" });

                List<Abastecimento> SyncList =
                    DataBase.AbastecimentoDAO.Sync(abastecimentos.Abastecimentos);

                if (SyncList != null)
                {
                    return JsonConvert.SerializeObject(SyncList);
                }
                else
                {
                    Util.WriteLog.Write("ERRO AO SINCRONIZAR LISTA - NENHUM REGISTRO NO BANCO LOCAL", Util.ENUM.LOG_FILENAME_SYSTEM);
                    return null;
                }
            }catch(System.ArgumentNullException ex)
            {
                Util.WriteLog.Write("" + ex, Util.ENUM.LOG_FILENAME_SYSTEM);
                string query = "SELECT * FROM abastecimento WHERE idBico = "+id;
                return JsonConvert.SerializeObject(AbastecimentoDAO.GetData(query));
            }catch(HttpRequestException ex)
            {
                Util.WriteLog.Write("" + ex, Util.ENUM.LOG_FILENEMA_HTTP);
                string query = "SELECT * FROM abastecimento WHERE idBico = " + id;
                return JsonConvert.SerializeObject(AbastecimentoDAO.GetData(query));
            }
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Abastecimento value)
        {
            
            HttpResponseMessage response = await SendAfericao(value);
            if (response == null || !response.IsSuccessStatusCode)
            {
                if(AbastecimentoDAO.PersistAfericao(value) == null)
                {
                    SyncAfericao();
                    return StatusCode(201);
                }
                else
                {
                    Util.WriteLog.Write("persistiu aferição POST", Util.ENUM.LOG_FILENAME_SYSTEM);
                    return StatusCode(500);
                }
            }
            else
            {
                return StatusCode(201);
            }



        }


        public async Task<string> GetDadosApi(string EndPoint)
        {

            using (var client = new HttpClient())
            {
                client.BaseAddress = new System.Uri(Util.ENUM.URI_SERVIDOR);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage response = await client.GetAsync(EndPoint);
                if (response.IsSuccessStatusCode)
                {
                    string bicosString = await response.Content.ReadAsStringAsync();
                    return bicosString;
                }
                else
                {
                    Util.WriteLog.Write("" + response.StatusCode, Util.ENUM.LOG_FILENEMA_HTTP);
                    return null;
                }

            }
        }

        public async Task<HttpResponseMessage> SendAfericao(Abastecimento a)
        {
            using (var client = new HttpClient())
            {
                HttpResponseMessage response = null;
                try
                {
                    response = await client.PostAsJsonAsync(
                        Util.ENUM.END_POINT_AFERICAO + a.Id, a);
                }
                catch(HttpRequestException ex)
                {
                    Util.WriteLog.Write("" + ex, Util.ENUM.LOG_FILENEMA_HTTP);
                }
                return response;
            }
        }

        public void SyncAfericao()
        {
            string query = "SELECT * FROM abastecimento " +
                            "JOIN afericao " +
                            "ON abastecimento.id = afericao.id_abastecimento " +
                            "AND afericao.processado = 0";
            List<Abastecimento> afericoes = AbastecimentoDAO.GetData(query);
            CancellationTokenSource cancel = new CancellationTokenSource();
            Task.Run(async () =>
            {
                Boolean conected = true;
                while (conected)
                {
                    Util.WriteLog.Write("afericao serv", Util.ENUM.LOG_FILENAME_SYSTEM);
                    // Funções do seu aplicativo vão aqui
                    int countStatus = 0;
                    foreach(Abastecimento a in afericoes)
                    {
                        HttpResponseMessage res = await SendAfericao(a);
                        if (res != null && res.IsSuccessStatusCode)
                        {
                            AbastecimentoDAO.UpdateAfericao(a);
                            Util.WriteLog.Write("update afericao", Util.ENUM.LOG_FILENAME_SYSTEM);
                            countStatus++;
                        }
                    }
                    if(countStatus == afericoes.Count())
                    {
                        conected = false;
                    }

                    Thread.Sleep(TimeSpan.FromSeconds(5));
                }
            }, cancel.Token);
           
        }
    }
}