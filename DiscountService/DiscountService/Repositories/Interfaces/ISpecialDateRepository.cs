using ProductService.Models;
using System;
using System.Threading.Tasks;

namespace ProductService.Repositories.Interfaces
{
	public interface ISpecialDateRepository:IBaseRepository<SpecialDate>
	{
		Task<SpecialDate> GetByDate(DateTime date);
	}
}