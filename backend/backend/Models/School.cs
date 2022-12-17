namespace backend.Models
{
    public class School
    {
        public School(int id, string name)
        {
            Id = id;
            Name = name;
        }

     
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<SchoolMenu> Menu { get; set; }
    }
}
