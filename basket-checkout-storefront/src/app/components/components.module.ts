import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BasketPreviewComponent } from './basket-preview/basket-preview.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [BasketPreviewComponent, ButtonComponent],
  imports: [BrowserModule, RouterModule],
  exports: [BasketPreviewComponent, ButtonComponent],
})
export class ComponentsModule {}
