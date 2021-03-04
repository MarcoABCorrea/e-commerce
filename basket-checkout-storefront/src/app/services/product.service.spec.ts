import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ProductService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getAllProducts()', () => {
    it('should "GET" call "products" endpoint', () => {
      service.getAllProducts().subscribe((response) => {
        expect(response).not.toBe(null);
      });
      const req = httpMock.expectOne('http://localhost:9001/products');
      expect(req.request.method).toBe('GET');
    });
  });

  describe('#applyPromoCode()', () => {
    it('should "POST" call "promocode" endpoint', () => {
      service.applyPromoCode('X10').subscribe((response) => {
        expect(response).not.toBe(null);
      });
      const req = httpMock.expectOne('http://localhost:9001/promocode');
      expect(req.request.method).toBe('POST');
    });
  });
});
