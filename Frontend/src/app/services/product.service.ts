import { Injectable } from '@angular/core';
import { HttpService } from './HttpService';
import { BaseService } from './BaseService';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<Product> {

  constructor(protected httpService: HttpService) {
    super(httpService);
    this.setControler('products');
  }
}
