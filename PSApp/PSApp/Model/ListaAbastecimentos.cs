using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PSApp.Model
{
    public class ListaAbastecimentos
    {
        [JsonProperty("ListaAbastecimentos")]
        private List<Abastecimento> abastecimentos;

        public List<Abastecimento> Abastecimentos { get => abastecimentos; set => abastecimentos = value; }
    }
}
