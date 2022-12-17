using backend.Dto;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("/School")]
    [ApiController]
    public class SchoolController : ControllerBase
    {
   
        private readonly ILogger<SchoolController> _logger;
        private readonly DataContext _context;

        public SchoolController(ILogger<SchoolController> logger, DataContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async  Task<ActionResult<List<School>>> GetSchoolMenu()
        {
            return Ok(await _context.School
                .Include(i => i.Menu)
                .ThenInclude(i => i.products)
                .ThenInclude(i => i.Product)
                .ToListAsync());
        }

        [HttpPost(Name = "/{id}")]
        public async Task<ActionResult<List<School>>> CreateSchoolMenu(int id, CreateSchoolMenuDto school)
        {
            var schoolMenu = new SchoolMenu(school.Date, id);

            _context.SchoolMenu.Add(schoolMenu);
            await _context.SaveChangesAsync();

            school.Products.ForEach(e => _context.SchoolMenuProducts.Add(new SchoolMenuProducts(e.AmountKG, e.ProductId, schoolMenu.Id)));

            await _context.SaveChangesAsync();

            return Ok(await _context.School
                .Include(i => i.Menu)
                .ThenInclude(i => i.products)
                .ThenInclude(i => i.Product)
                .ToListAsync());
        }
    }
}