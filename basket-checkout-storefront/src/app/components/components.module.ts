import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BasketPreviewComponent } from './basket-preview/basket-preview.component';
import { ButtonComponent } from './button/button.component';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  declarations: [BasketPreviewComponent, ButtonComponent, ProductListComponent],
  imports: [BrowserModule, RouterModule],
  exports: [BasketPreviewComponent, ButtonComponent, ProductListComponent],
})
export class ComponentsModule {}
