using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class SchoolMenu
    {

        public SchoolMenu(int id, DateTime date, int SchoolId)
        {
            Id = id;
            this.date = date;
            this.SchoolId = SchoolId;
        }

        public SchoolMenu(DateTime date, int SchoolId)
        {
            this.date = date;
            this.SchoolId = SchoolId;
        }

        public int Id { get; set; }

        [Column(TypeName = "Date")]
        public DateTime date { get; set; }

        public int SchoolId { get; set; }

        [JsonIgnore]
        public School School { get; set; }

        public ICollection<SchoolMenuProducts> products { get; set; }
    }
}
