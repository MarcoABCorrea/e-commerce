import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  BasketCheckoutComponent,
  CheckoutResponseComponent,
  ProductsComponent,
} from './pages';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'basket', component: BasketCheckoutComponent },
  { path: 'response', component: CheckoutResponseComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
