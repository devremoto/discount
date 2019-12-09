import { Discount } from './discount';

export class Product {
  _id: string;
  price: number;
  title: string;
  description: string;
  discount: Discount;
}
