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

  addBasketLength(quantity: number): void {
    let current = this._basketLength.getValue() + quantity;
    this._basketLength.next(current);
  }

  removeBasketLength(quantity: number): void {
    let current = this._basketLength.getValue() - quantity;
    this._basketLength.next(current);
  }

  changeProductQuantity(newQuantity: number, product: Product): void {
    let prod = this._products.find(({ sku }) => sku === product.sku);
    if (product.quantity > newQuantity) {
      this.removeBasketLength(product.quantity - newQuantity);
    } else {
      this.addBasketLength(newQuantity - product.quantity);
    }
    const index = this._products.indexOf(prod);
    this._products[index].quantity = newQuantity;
  }

  addProduct(product: Product): Array<Product> {
    let prod = this._products.find(({ sku }) => sku === product.sku);

    if (prod && prod.quantity === 10) {
      return this.products;
    }

    if (prod) {
      let index = this._products.indexOf(prod);
      this._products[index].quantity++;
    } else {
      product.quantity = 1;
      this._products.push(product);
    }

    this.addBasketLength(1);
    return this.products;
  }

  removeProduct(product: Product): Array<Product> {
    let prod = this._products.find(({ sku }) => sku === product.sku);
    let index = this._products.indexOf(prod);
    this._products.splice(index, 1);
    this.removeBasketLength(prod.quantity);
    return this.products;
  }

  getBasketItems(): Array<BasketItem> {
    let items: Array<BasketItem> = [];
    this._products.map(({ sku, quantity }) => items.push({ sku, quantity }));
    return items;
  }

  get products(): Array<Product> {
    return this._products;
  }

  resetBasket(): void {
    this._products = [];
    this._basketLength.next(0);
  }
}
