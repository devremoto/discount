using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProductService.Repositories.Interfaces
{
	public interface IBaseRepository<T>
	{
		Task<T> GetById(ObjectId id);
		Task<IEnumerable<T>> GetAll();
	}
}