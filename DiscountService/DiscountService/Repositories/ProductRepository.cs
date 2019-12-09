using Microsoft.Extensions.Configuration;
using ProductService.Models;
using ProductService.Repositories.Interfaces;

namespace ProductService.Repositories
{
	public class ProductRepository : BaseRepository<Product>, IProductRepository
	{
		public ProductRepository(AppDbContext context)
		: base(context)
		{

		}
	}
}
