using MongoDB.Bson.Serialization.Attributes;

namespace ProductService.Models
{
	public class Discount
	{
		[BsonElement("pct")]
		public float Pct { get; set; }

		[BsonElement("value")]
		public int Value { get; set; }

		[BsonElement("finalPrice")]
		public int FinalPrice { get; set; }
	}
}
