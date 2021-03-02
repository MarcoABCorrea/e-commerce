import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Basket } from '@models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private basePath: string = environment.BASE_URL;
  private checkoutPath: string = this.basePath + 'checkout';

  constructor(private http: HttpClient) {}

  public checkout(basket: Basket): Observable<any> {
    return this.http.post<any>(this.checkoutPath, basket);
  }
}
