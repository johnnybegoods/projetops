using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PSApp.Model
{
    public class Abastecimento
    {
        private DateTime _DataHora;
        private string _Descricao;
        private string _Funcionario;
        private int _Id;
        private int _IdBico;
        private int _IdCombustivel;
        private int _IdFuncionario;
        private int _IdTipoPreco;
        private int _Litros;
        private int _NumeroBico;
        private Double _Preco;
        private Boolean _PrevalecePrecoBico;
        private Boolean _Selecionar;
        private Double _Total;

        public DateTime DataHora { get => _DataHora; set => _DataHora = value; }
        public string Descricao { get => _Descricao; set => _Descricao = value; }
        public string Funcionario { get => _Funcionario; set => _Funcionario = value; }
        public int Id { get => _Id; set => _Id = value; }
        public int IdBico { get => _IdBico; set => _IdBico = value; }
        public int IdCombustivel { get => _IdCombustivel; set => _IdCombustivel = value; }
        public int IdFuncionario { get => _IdFuncionario; set => _IdFuncionario = value; }
        public int IdTipoPreco { get => _IdTipoPreco; set => _IdTipoPreco = value; }
        public int Litros { get => _Litros; set => _Litros = value; }
        public int NumeroBico { get => _NumeroBico; set => _NumeroBico = value; }
        public double Preco { get => _Preco; set => _Preco = value; }
        public bool PrevalecePrecoBico { get => _PrevalecePrecoBico; set => _PrevalecePrecoBico = value; }
        public bool Selecionar { get => _Selecionar; set => _Selecionar = value; }
        public double Total { get => _Total; set => _Total = value; }
    }
}
