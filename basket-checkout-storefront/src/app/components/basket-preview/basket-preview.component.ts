import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'basket-preview',
  templateUrl: './basket-preview.component.html',
  styleUrls: ['./basket-preview.component.scss'],
})
export class BasketPreviewComponent implements OnInit {
  basketLength$: Observable<number>;

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.basketLength$ = this.basketService.currentLength();
  }
}
