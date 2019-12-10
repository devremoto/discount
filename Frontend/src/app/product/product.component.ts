import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { ProductModalComponent } from './product-modal.component';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

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
  private modalRef: NgbModalRef;

  constructor(private productService: ProductService, private modalService: NgbModal) { }

  ngOnInit() {
    this.load();
  }
  load() {
    this.$products = this.productService.retrieve();
  }

  add() {
    this.state.edit = true;
    this.product = new Product();
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

  openModal(productId: string) {
    const options = { size: 'lg', backdrop: 'static', windowClass: 'modal-primary' } as NgbModalOptions;
    this.modalRef = this.modalService.open(ProductModalComponent, options);
    this.modalRef.componentInstance.name = 'productModal';
    this.modalRef.componentInstance.productId = productId;
  }

}
