using MongoDB.Driver;

namespace ProductService
{
	public class AppDbContext
	{
		private readonly IMongoDatabase _db;

		public AppDbContext(IMongoClient client, string dbName)
		{
			_db = client.GetDatabase(dbName);
		}

		public IMongoCollection<T> DbSet<T>()
		{
			return _db.GetCollection<T>(typeof(T).Name.ToLower());
		}
	}


}