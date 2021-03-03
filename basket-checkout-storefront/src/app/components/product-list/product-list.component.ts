import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionType, Product } from '@models';
import { BasketService } from '@services';

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
  quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.actionText = this.isRemove() ? 'Remove' : 'Add to basket';
  }

  changeQuantity(newQuantity: number, product: Product) {
    this.basketService.changeProductQuantity(newQuantity, product);
    this.productsChanged.emit();
  }

  getPrice({ price, quantity }: Product): string {
    let priceVal = this.isRemove() ? price * quantity : price;
    return priceVal.toFixed(2);
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
