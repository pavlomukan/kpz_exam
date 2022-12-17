namespace backend.Dto
{
    public class CreateSchoolMenuDto
    {
        public DateTime Date { get; set; }

        public List<SchoolMenuProductDto> Products { get; set; }

    }
}
