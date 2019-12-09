using DiscountService.Protos;
using Grpc.Core;
using MongoDB.Bson;
using ProductService.Repositories.Interfaces;
using System;
using System.Threading.Tasks;

namespace ProductService.Services
{
	public class DiscountService : DiscountRPCService.DiscountRPCServiceBase
	{
		private readonly IUserRepository _userRepository;
		private readonly ISpecialDateRepository _specialDateRepository;
		private readonly IProductRepository _productRepository;
		private readonly DateTime _today = DateTime.Now;

		public DiscountService(IUserRepository userRepository, ISpecialDateRepository specialDateRepository, IProductRepository productRepository)
		{
			_userRepository = userRepository;
			_specialDateRepository = specialDateRepository;
			_productRepository = productRepository;
		}

		public override async Task<DiscountModel> GetDiscount(DiscountRequest request, ServerCallContext context)
		{
			var discount = await Discount(request.UserId);
			return new DiscountModel
			{
				Pct = discount
			};
		}

		public override async Task<ProductModel> GetProductDiscount(DiscountProductRequest request, ServerCallContext context)
		{
			var discount = await Discount(request.UserId);
			ObjectId productId;
			ObjectId.TryParse(request.ProductId, out productId);
			var product = await _productRepository.GetById(productId);
			if (product != null)
			{
				return new ProductModel
				{
					Id = product.Id.ToString(),
					Price = product.Price,
					Description = product.Description,
					Discount = new DiscountModel
					{
						Pct = discount,
						Value = product.Price * (discount / 100),
						FinalPrice = product.Price * (1 - (discount / 100))
					}
				};
			}
			return null;
		}

		private async Task<float> Discount(string userId)
		{
			try
			{
				float userDiscount = await UserDiscount(userId);
				float dateDiscount = await DateDiscount();
				return Math.Max(dateDiscount, userDiscount);
			}
			catch (Exception e)
			{
				Console.WriteLine(e);
				throw;
			}
		}


		private async Task<float> DateDiscount()
		{
			var date = await _specialDateRepository.GetByDate(DateTime.Now);
			var dateDiscount = 0F;
			if (date != null)
			{
				dateDiscount = Math.Min(10F,date.Discount);
			}

			return dateDiscount;
		}

		private async Task<float> UserDiscount(string userId)
		{
			try
			{
				ObjectId id;
				ObjectId.TryParse(userId, out id);

				var user = await _userRepository.GetById(id);
				var userDiscount = 0F;
				if (user != null && user.BirthDate.ToString("MM-dd") == _today.ToString("MM-dd"))
				{
					userDiscount = 5;
				}

				return userDiscount;
			}
			catch (Exception e)
			{

				throw e;
			}
		}
	}
}
