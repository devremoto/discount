using MongoDB.Bson;
using MongoDB.Driver;
using ProductService.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProductService.Repositories
{
	public class BaseRepository<T> : IBaseRepository<T>
	where T : class, new()
	{

		protected readonly IMongoCollection<T> collection;

		public BaseRepository(AppDbContext database)
		{
			collection = database.DbSet<T>();
		}

		public async Task<IEnumerable<T>> GetAll()
		{
			try
			{
				var filter = Builders<T>.Filter.Empty;
				var listResult = await collection.Find(filter).ToListAsync();
				return listResult;
			}
			catch (System.Exception e)
			{
				throw e;
			}
		}
		public async Task<IEnumerable<BsonDocument>> GetAll2()
		{

			var result = new List<BsonDocument>();
			var list = await collection.FindAsync<BsonDocument>(new BsonDocument());
			using (IAsyncCursor<BsonDocument> cursor = list)
			{
				while (await cursor.MoveNextAsync())
				{
					IEnumerable<BsonDocument> batch = cursor.Current;
					foreach (BsonDocument document in batch)
					{
						result.Add(document);
					}
				}
			}
			//var a = result;
			//var filter = Builders<T>.Filter.Empty;
			//var listResult = await collecion.Find<T>(filter).ToListAsync();
			return result;
		}

		public async Task<T> GetById(ObjectId id)
		{
			var builder = Builders<T>.Filter;
			var filter = builder.Eq("_id", id);
			var result = await collection.Find(filter).FirstOrDefaultAsync();
			return result;
		}
	}
}
