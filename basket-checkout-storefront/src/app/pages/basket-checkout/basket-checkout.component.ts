import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models';
import { CheckoutService } from 'src/app/services/checkout.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-basket-checkout',
  templateUrl: './basket-checkout.component.html',
  styleUrls: ['./basket-checkout.component.scss'],
})
export class BasketCheckoutComponent implements OnInit {
  basket: Array<any> = [];
  subTotal: number = 0;
  discont: number = 0;
  basketTotal: number = 0;
  creditCard: string = '4539456463019519'; // TODO fix this

  constructor(
    private sharedDataService: SharedDataService,
    private router: Router,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.basket = this.sharedDataService.basketItems;
  }

  removeFromBasket(product: Product): void {
    this.basket = this.sharedDataService.removeFromBasket(product);
  }

  checkout(): void {
    console.log('checkout', this.creditCard);
    let basket = this.sharedDataService.getBasket();
    this.checkoutService.checkout(basket).subscribe((response) => {
      this.router.navigate(['response'], { queryParams: response });
    });
  }
}
