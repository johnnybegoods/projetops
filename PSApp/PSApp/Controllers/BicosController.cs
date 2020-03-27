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


            string bicosString = await GetDadosApi(Util.ENUM.END_POINT_BICOS);


            try
            {
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
                SqlConnection conn = DBAccess.GetConnection();
                conn.Open();
                return JsonConvert.SerializeObject(BicoDAO.GetData(conn, query));
            }
        }

        // GET: api/Bico/5
        [HttpGet("{id}", Name = "GetById")]
        public async Task<string> Get(int id)
        {
            
            string abastcimentoString = await GetDadosApi(Util.ENUM.END_PONINT_ABASTECIMENTOS+id);
            
            CultureInfo provider = CultureInfo.InvariantCulture;

            try
            {
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
                string query = "SELECT * FROM abastecimento";
                SqlConnection conn = DBAccess.GetConnection();
                conn.Open();
                return JsonConvert.SerializeObject(AbastecimentoDAO.GetData(conn, query));
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

    }
}