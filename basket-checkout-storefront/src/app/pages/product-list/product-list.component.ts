import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models';
import { ProductService } from 'src/app/services/product.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private sharedDataService: SharedDataService
  ) {}

  products: Array<Product> = [];
  basket: Array<Product> = [];

  ngOnInit(): void {
    this.loadProducts();
    this.loadBasket();
  }

  loadProducts(): void {
    this.productService
      .getAllProducts()
      .subscribe((response) => (this.products = response));
  }

  loadBasket(): void {
    this.basket = this.sharedDataService.basketItems;
  }

  addToBasket(product: Product): void {
    this.basket = this.sharedDataService.addToBasket(product);
  }
}
