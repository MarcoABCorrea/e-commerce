import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutResponse } from '@models';
import { BasketService } from '@services';

@Component({
  selector: 'app-checkout-response',
  templateUrl: './checkout-response.component.html',
  styleUrls: ['./checkout-response.component.scss'],
})
export class CheckoutResponseComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private basketService: BasketService
  ) {}

  messages: Array<string> = [];

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(({ response }) => {
      const res: CheckoutResponse = JSON.parse(response);
      if (res.errors) {
        res.errors.map((err) => this.messages.push(err.msg));
      } else {
        this.messages.push(res.msg);
      }
    });
  }

  reset(): void {
    this.basketService.resetBasket();
    this.router.navigate(['']);
  }
}
