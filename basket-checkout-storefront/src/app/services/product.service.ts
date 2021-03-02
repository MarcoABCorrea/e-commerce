import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../core/models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private basePath: string = environment.BASE_URL;
  private productsPath: string = this.basePath + 'products';
  private promocodePath: string = this.basePath + 'promocode';

  constructor(private http: HttpClient) {}

  public getAllProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.productsPath);
  }

  public promocode(code: any): Observable<any> {
    return this.http.post<any>(this.promocodePath, code);
  }
}
