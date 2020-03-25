using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PSApp.Model
{
    public class ListaBicos
    {
        [JsonProperty("ListaBicos")]
        public List<Bico> bicos;
       
        public List<Bico> Bicos { get => bicos; set => bicos = value; }
    }
}
