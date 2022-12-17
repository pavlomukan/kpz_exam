namespace backend.Models
{
    public class Products
    {

        public Products(int id, string name, double pricePerKg)
        {
            Id = id;
            Name = name;
            PricePerKg = pricePerKg;
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public double PricePerKg { get; set; }

    }
}
