using backend.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {

        private readonly ILogger<ProductsController> _logger;
        private readonly DataContext _context;

        public ProductsController(ILogger<ProductsController> logger, DataContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<School>>> GetProducts()
        {
            return Ok(await _context.Products.ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<List<School>>> CreateProduct(Products product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return Ok();
        }


        [HttpPut(Name = "{id}")]
        public async Task<ActionResult<List<School>>> UpdateProduct(int id, UpdateProductDto product)
        {
            var foundProduct = await _context.Products.FindAsync(id);

            if (foundProduct == null)
            {
                return BadRequest("Product not found");
            }

            foundProduct.PricePerKg = product.PricePerKg;
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
