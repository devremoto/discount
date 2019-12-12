using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace ProductService.Models
{
    [BsonIgnoreExtraElements]
    public class SpecialDate
    {
        [BsonElement("_id")]
        public ObjectId Id { get; set; }

        [BsonElement("description")]
        public string Description { get; set; }

        [BsonElement("discount")]
        public float Discount { get; set; }

        [BsonElement("date")]
        [BsonDateTimeOptions(DateOnly = true, Kind = DateTimeKind.Utc)]
        public DateTime Date { get; set; }
    }
}
