import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Basket, CheckoutResponse } from '@models';
import { BasketService, CheckoutService, ProductService } from '@services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-basket-checkout',
  templateUrl: './basket-checkout.component.html',
  styleUrls: ['./basket-checkout.component.scss'],
})
export class BasketCheckoutComponent implements OnInit, OnDestroy {
  products: Array<any> = [];
  promoCode: string;
  subTotal: number;
  discont: number = 0;
  basketTotal: number = 0;
  cardNumber: string;
  subscriptions: Array<Subscription> = [];

  constructor(
    private router: Router,
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadPromoCode();
    this.loadProducts();
    this.calcPrices();
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length > 0) {
      this.subscriptions.map((sub) => sub.unsubscribe());
    }
  }

  loadPromoCode(): void {
    this.promoCode = this.productService.currentPromoCode.code;
    this.discont = this.productService.currentPromoCode.discount;
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
    const sub = this.productService.applyPromoCode(this.promoCode).subscribe({
      next: (promo) => {
        this.discont = promo.amount;
        this.productService.currentPromoCode = {
          discount: promo.amount,
          code: this.promoCode,
        };
        this.calcPrices();
      },
      error: () =>
        console.error('An error occurred while applying promo code!'),
    });
    this.subscriptions.push(sub);
  }

  checkout(): void {
    const cardNumber = this.cardNumber?.toString();
    const isCreditCardValid = this.checkoutService.isCreditCardValid(
      cardNumber
    );

    if (isCreditCardValid && this.products.length > 0) {
      const basket = this.basketService.getBasketItems();
      const checkoutData: Basket = {
        basket,
        cardNumber,
      };

      this.productService.resetPromo();
      const sub = this.checkoutService.checkout(checkoutData).subscribe({
        next: (res) => this.redirect(res),
        error: (res) => this.redirect(res.error),
      });

      this.subscriptions.push(sub);
    }
  }

  redirect(res: CheckoutResponse): void {
    this.router.navigate(['response'], {
      queryParams: { response: JSON.stringify(res) },
    });
  }
}
