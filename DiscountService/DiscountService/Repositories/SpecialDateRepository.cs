using MongoDB.Driver;
using ProductService.Models;
using ProductService.Repositories.Interfaces;
using System;
using System.Threading.Tasks;

namespace ProductService.Repositories
{
	public class SpecialDateRepository : BaseRepository<SpecialDate>, ISpecialDateRepository
	{
		public SpecialDateRepository(AppDbContext context)
		: base(context)
		{

		}

		public async Task<SpecialDate> GetByDate(DateTime date)
		{
			try
			{
				SpecialDate result = null;
				var dateSearch = Convert.ToDateTime(date.ToShortDateString());
				var builder = Builders<SpecialDate>.Filter;
				var filter = builder.Eq(x => x.Date, dateSearch);
				result = await collection.Find(filter).FirstOrDefaultAsync();
				return result;
			}
			catch (System.Exception e)
			{
				throw e;
			}
		}
	}
}
