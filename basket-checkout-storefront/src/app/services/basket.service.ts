import { Injectable } from '@angular/core';
import { BasketItem, Product } from '@models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor() {}

  private _products: Array<Product> = [];
  private _basketLength = new BehaviorSubject<number>(0);

  currentLength(): Observable<number> {
    return this._basketLength.asObservable();
  }

  addBasketLength(): void {
    let current = this._basketLength.getValue();
    current++;
    this._basketLength.next(current);
  }

  removeBasketLength(quantity: number): void {
    let current = this._basketLength.getValue() - quantity;
    this._basketLength.next(current);
  }

  addProduct(product: Product): Array<Product> {
    let prod = this._products.find((p) => p.sku === product.sku);

    if (prod) {
      let index = this._products.indexOf(prod);
      this._products[index].quantity++;
    } else {
      product.quantity = 1;
      this._products.push(product);
    }

    this.addBasketLength();
    return this._products;
  }

  removeProduct(product: Product): Array<Product> {
    let prod = this._products.find((p) => p.sku === product.sku);
    let index = this._products.indexOf(prod);
    this._products.splice(index, 1);
    this.removeBasketLength(prod.quantity);
    return this._products;
  }

  getBasketItems(): Array<BasketItem> {
    let items: Array<BasketItem> = [];
    this._products.map(({ sku, quantity }) => items.push({ sku, quantity }));
    return items;
  }

  get products(): Array<Product> {
    return this._products;
  }
}
