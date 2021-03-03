import { Component, OnInit } from '@angular/core';
import { Product } from '@models';
import { ProductService } from '@services';
import { Observable } from 'rxjs';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(private productService: ProductService) {}

  products$: Observable<Array<Product>>;

  ngOnInit(): void {
    this.products$ = this.productService.getAllProducts();
  }
}
