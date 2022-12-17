using System.Text.Json.Serialization;

namespace backend.Models
{
    public class SchoolMenuProducts
    {

        public SchoolMenuProducts(int id, double amountKG, int productId, int schoolMenuId)
        {
            Id = id;
            AmountKG = amountKG;
            ProductId = productId;
            SchoolMenuId = schoolMenuId;
        }

        public SchoolMenuProducts(double amountKG, int productId, int schoolMenuId)
        {
            AmountKG = amountKG;
            ProductId = productId;
            SchoolMenuId = schoolMenuId;
        }

        public int Id { get; set; }

        public double AmountKG { get; set; }

        public int ProductId { get; set; } 

        public int SchoolMenuId { get; set; }

        public Products Product { get; set; }

        [JsonIgnore]
        public SchoolMenu SchoolMenu { get; set; }
    }
}
