import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Basket, CheckoutResponse } from '@models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private basePath: string = environment.BASE_URL;
  private checkoutPath: string = this.basePath + 'checkout';

  constructor(private http: HttpClient) {}

  public checkout(basket: Basket): Observable<CheckoutResponse> {
    return this.http.post<CheckoutResponse>(this.checkoutPath, basket);
  }

  public isCreditCardValid(value: string): boolean {
    // Accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(value)) return false;

    let nCheck = 0,
      bEven = false;
    value = value.replace(/\D/g, '');

    for (let n = value.length - 1; n >= 0; n--) {
      let cDigit = value.charAt(n),
        nDigit = parseInt(cDigit, 10);

      if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

      nCheck += nDigit;
      bEven = !bEven;
    }

    return nCheck % 10 == 0;
  }
}
