using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProductService.Models
{
	[BsonIgnoreExtraElements]
	public class Product
	{
		[BsonElement("_id")]
		public ObjectId Id { get; set; }

		[BsonElement("priceInCents")]
		public int Price { get; set; }

		[BsonElement("title")]
		public string Title { get; set; }

		[BsonElement("description")]
		public string Description { get; set; }

		[BsonElement("discount")]
		public Discount Discount { get; set; }
	}
}
