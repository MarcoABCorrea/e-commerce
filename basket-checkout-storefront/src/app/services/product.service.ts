import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, PromoDiscount, PromoResponse } from '@models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private basePath: string = environment.BASE_URL;
  private productsPath: string = this.basePath + 'products';
  private promoCodePath: string = this.basePath + 'promocode';
  private _currentPromo: PromoDiscount = new PromoDiscount();

  constructor(private http: HttpClient) {}

  public getAllProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.productsPath);
  }

  public applyPromoCode(promoCode: string): Observable<PromoResponse> {
    return this.http.post<PromoResponse>(this.promoCodePath, { promoCode });
  }

  set currentPromoCode(promo: PromoDiscount) {
    this._currentPromo = promo;
  }

  get currentPromoCode(): PromoDiscount {
    return this._currentPromo;
  }

  resetPromo(): void {
    this.currentPromoCode = new PromoDiscount();
  }
}
