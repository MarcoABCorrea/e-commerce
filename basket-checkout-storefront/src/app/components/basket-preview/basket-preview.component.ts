import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'basket-preview',
  templateUrl: './basket-preview.component.html',
  styleUrls: ['./basket-preview.component.scss'],
})
export class BasketPreviewComponent implements OnInit {
  @Input() quantity: number;

  constructor() {}

  ngOnInit(): void {}
}
