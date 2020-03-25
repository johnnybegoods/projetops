using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PSApp.Model
{
    public class Bico
    {
        public string _DescricaoCombustivel;
        public int _Id;
        public int _Numero;

        public string DescricaoCombustivel { get => _DescricaoCombustivel; set => _DescricaoCombustivel = value; }
        public int Id { get => _Id; set => _Id = value; }
        public int Numero { get => _Numero; set => _Numero = value; }
    }
}
