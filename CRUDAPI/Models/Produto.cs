using System;
namespace CRUDAPI.Models
{
    public class Produto
    {
        public int Id { get; set; }
        public string DescProduto { get; set; }
        public string Situacao { get; set; }
        public DateTime DtFabricacao { get; set; }
        public DateTime DtValidade { get; set; }
        public int CodFornecedor { get; set; }
        public string DescFornecedor { get; set; }
        public string CNPJ { get; set; }

    }
}