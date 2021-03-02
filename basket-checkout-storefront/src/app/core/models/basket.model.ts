import { BasketItem } from './basket-item.model';

export interface Basket {
  basket: Array<BasketItem>;
  cardNumber: string;
}
