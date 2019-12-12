using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace ProductService.Models
{
    [BsonIgnoreExtraElements]
    public class User
    {
        [BsonElement("_id")]
        public ObjectId Id { get; set; }

        [BsonElement("firstname")]
        public string FirstName { get; set; }

        [BsonElement("lastname")]
        public string LastName { get; set; }

        [BsonElement("birthdate")]
        [BsonDateTimeOptions(DateOnly = true, Kind = DateTimeKind.Utc)]
        public DateTime BirthDate { get; set; }
    }
}
