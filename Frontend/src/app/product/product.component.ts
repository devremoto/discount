import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  $products: Observable<Array<Product>>;
  product: Product = new Product();
  state = {
    edit: false,
  };
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.load();
  }
  load() {
    this.$products = this.productService.retrieve();
  }

  add() {
    this.state.edit = true;
  }

  edit(product: Product) {
    this.state.edit = true;
    this.product = product;
  }

  delete(product: Product) {
    this.productService
      .delete(product._id)
      .subscribe(
        result => {
          this.state.edit = false;
          this.load();
          console.log(result);
        },
        error => console.log(error)
      );
  }


  create(product: Product) {
    this.state.edit = true;
    this.productService
      .create(product)
      .subscribe(
        result => {
          this.state.edit = false;
          this.load();
          console.log(result);
        },
        error => console.log(error)
      );
  }

  update(product: Product) {
    this.state.edit = true;
    this.productService
      .update(product)
      .subscribe(
        result => {
          this.state.edit = false;
          this.load();
          console.log(result);
        },
        error => console.log(error)
      );
  }

  save(product: Product) {
    if (product._id) {
      this.update(product);
    } else {
      this.create(product);
    }
  }
  cancel() {
    this.product = {} as Product;
    this.state.edit = false;
  }

}
