import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout-response',
  templateUrl: './checkout-response.component.html',
  styleUrls: ['./checkout-response.component.scss'],
})
export class CheckoutResponseComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  message: string;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.message = params.msg;
    });
  }
}
