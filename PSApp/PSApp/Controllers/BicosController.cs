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


            string bicosString = await GetDadosApi("metapay/bicos");
            ListaBicos bicos = JsonConvert.DeserializeObject<ListaBicos>(bicosString);

            List<Bico> SyncList = DataBase.BicoDAO.Sync(bicos.Bicos);

            if(SyncList != null)
            {
                return JsonConvert.SerializeObject(SyncList);
            }
            else
            {
                Util.WriteLog.Write("ERRO AO SINCRONIZAR LISTA - OBJETO NUO", Util.ENUM.LOG_FILENAME_SYSTEM);
                return null;
            }
            
        }

        // GET: api/Bico/5
        [HttpGet("{id}", Name = "GetById")]
        public async Task<string> Get(int id)
        {
            var settings = new JsonSerializerSettings { DateFormatString = "yyyy-MM-ddTHH:mm:ss.fffZ" };

            var formatoData = "dd/MM/YYYY HH:mm:ss";
            var dateTimeConverter = new IsoDateTimeConverter { DateTimeFormat = formatoData };

            string abastcimentoString = await GetDadosApi("metapay/abastecimentos?bico="+id);
            ListaAbastecimentos abastecimentos = 
                JsonConvert.DeserializeObject<ListaAbastecimentos>(abastcimentoString, dateTimeConverter);

            List<Abastecimento> SyncList = 
                DataBase.AbastecimentoDAO.Sync(abastecimentos.Abastecimentos);

            if (SyncList != null)
            {
                return JsonConvert.SerializeObject(SyncList);
            }
            else
            {
                Util.WriteLog.Write("ERRO AO SINCRONIZAR LISTA - OBJETO NUO", Util.ENUM.LOG_FILENAME_SYSTEM);
                return null;
            }
        }


        public async Task<string> GetDadosApi(string EndPoint)
        {

            using (var client = new HttpClient())
            {
                client.BaseAddress = new System.Uri("http://metanet2.softether.net:8989/");
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