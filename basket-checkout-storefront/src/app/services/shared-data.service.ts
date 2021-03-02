import { Injectable } from '@angular/core';
import { Basket, BasketItem, Product } from '../core/models';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  constructor() {}

  public basketItems: Array<Product> = [];
  public cardNumber: string;

  addToBasket(product: Product): Array<Product> {
    let prod = this.basketItems.find((p) => p.sku === product.sku);

    if (prod) {
      let index = this.basketItems.indexOf(prod);
      this.basketItems[index].quantity++;
    } else {
      product.quantity = 1;
      this.basketItems.push(product);
    }

    return this.basketItems;
  }

  removeFromBasket(product: Product): Array<Product> {
    let prod = this.basketItems.find((p) => p.sku === product.sku);
    let index = this.basketItems.indexOf(prod);
    this.basketItems.splice(index, 1);
    return this.basketItems;
  }

  addCardNumber(cardNumber: string): void {
    this.cardNumber = cardNumber;
  }

  getBasket(): Basket {
    let items: Array<BasketItem> = [];
    this.basketItems.map((p) => {
      items.push({ sku: p.sku, quantity: p.quantity });
    });
    return { basket: items, cardNumber: this.cardNumber };
  }
}
