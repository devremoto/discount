using ProductService.Models;
using ProductService.Repositories.Interfaces;

namespace ProductService.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
	{
		public UserRepository(AppDbContext context)
		: base(context)
		{

		}
	}
}
