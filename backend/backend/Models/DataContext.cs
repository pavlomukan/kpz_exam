using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace backend.Models
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { 
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            var school1 = new School(1, "Lviv school");

            modelBuilder.Entity<School>().HasData(school1);

            var potato = new Products(1, "Potato", 20.5);
            var rice = new Products(2, "Rice", 72);
            var cabbage = new Products(3, "Cabbage", 54);
            var salad = new Products(4, "Salad", 154);
            var soup = new Products(5, "Soup", 280);
            var borsch = new Products(6, "Borsch", 340);
            var meat = new Products(7, "Meat", 200);

            modelBuilder.Entity<Products>().HasData(new List<Products> { potato, rice, cabbage, salad, soup, borsch, meat });

            var menu1 = new SchoolMenu(1, new DateTime(2022, 12, 16), school1.Id);
            var menu2 = new SchoolMenu(2, new DateTime(2022, 12, 15), school1.Id);


            modelBuilder.Entity<SchoolMenu>().HasData(menu1);
            modelBuilder.Entity<SchoolMenu>().HasData(menu2);

            var menu1Potato = new SchoolMenuProducts(1, 20, potato.Id, menu1.Id);
            var menu1Meat = new SchoolMenuProducts(2, 5, meat.Id, menu1.Id);

            var menu2Rice = new SchoolMenuProducts(3, 17, rice.Id, menu1.Id);
            var menu2Salad = new SchoolMenuProducts(4, 5, salad.Id, menu1.Id);
            var menu2Borsch = new SchoolMenuProducts(5, 12, borsch.Id, menu1.Id);


            modelBuilder.Entity<SchoolMenuProducts>().HasData(new List<SchoolMenuProducts> { menu1Potato, menu1Meat, menu2Rice, menu2Salad, menu2Borsch });

        }

        public DbSet<School> School { get; set; }

        public DbSet<Products> Products { get; set; }

        public DbSet<SchoolMenu> SchoolMenu { get; set;}

        public DbSet<SchoolMenuProducts> SchoolMenuProducts { get;set; }
    }
}
