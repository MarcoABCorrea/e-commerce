import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionType, Product } from '@models';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input() type: ActionType;
  @Input() products: Array<Product>;
  @Output() productsChanged = new EventEmitter();
  actionText: string;

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.actionText = this.isRemove() ? 'Remove' : 'Add to basket';
  }

  isRemove(): boolean {
    return this.type === 'REMOVE';
  }

  handleClick(product: Product): void {
    if (this.isRemove()) {
      this.basketService.removeProduct(product);
    } else {
      this.basketService.addProduct(product);
    }
    this.productsChanged.emit();
  }
}
