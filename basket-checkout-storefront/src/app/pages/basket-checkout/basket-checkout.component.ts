import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Basket, CheckoutResponse } from '@models';
import { BasketService } from 'src/app/services/basket.service';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-basket-checkout',
  templateUrl: './basket-checkout.component.html',
  styleUrls: ['./basket-checkout.component.scss'],
})
export class BasketCheckoutComponent implements OnInit {
  products: Array<any> = [];
  subTotal: number;
  discont: number = 0;
  basketTotal: number = 0;
  promoCode: string;
  cardNumber: string;

  constructor(
    private basketService: BasketService,
    private router: Router,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.calcPrices();
  }

  loadProducts(): void {
    this.products = this.basketService.products;
  }

  calcPrices(): void {
    this.subTotal = 0;
    this.products.map(({ price, quantity }) => {
      this.subTotal += price * quantity;
    });

    const discont = this.discont / 100;
    this.basketTotal = this.subTotal - discont * this.subTotal;
  }

  applyPromo(): void {
    console.log('validate promo');
  }

  checkout(): void {
    const basket = this.basketService.getBasketItems();
    const checkoutData: Basket = {
      basket,
      cardNumber: this.cardNumber?.toString(),
    };
    this.checkoutService.checkout(checkoutData).subscribe({
      next: (res) => this.redirect(res),
      error: (res) => this.redirect(res.error),
    });
  }

  redirect(res: CheckoutResponse): void {
    this.router.navigate(['response'], {
      queryParams: { response: JSON.stringify(res) },
    });
  }
}
