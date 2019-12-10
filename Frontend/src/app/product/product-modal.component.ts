import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-modal-about',
  templateUrl: './product-modal.component.html'
})
export class ProductModalComponent implements OnInit {

  $product: Observable<Product>;
  @Input() productId: string;

  constructor(private activeModal: NgbActiveModal, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.$product = this.productService.retrieveById(this.productId);
  }


  hideModal() {
    this.activeModal.dismiss('Cross click');
  }
}

