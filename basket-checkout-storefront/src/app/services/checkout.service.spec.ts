import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Basket } from '../core/models/basket.model';
import { CheckoutService } from './checkout.service';

describe('CheckoutService', () => {
  let service: CheckoutService;
  let httpMock: HttpTestingController;
  const validCreditCard = '4539456463019519';
  const invalidCreditCard = '1234567812345678';

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CheckoutService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#checkout()', () => {
    it('should "POST" call "checkout" endpoint', () => {
      const basket: Basket = { basket: [], cardNumber: '' };
      service.checkout(basket).subscribe((response) => {
        expect(response).not.toBe(null);
      });
      const req = httpMock.expectOne('http://localhost:9001/checkout');
      expect(req.request.method).toBe('POST');
    });
  });

  describe('#isCreditCardValid()', () => {
    it('should return true when passing valid credit card', () => {
      let isValid = service.isCreditCardValid(validCreditCard);
      expect(isValid).toBe(true);
    });

    it('should return false when passing invalid credit card', () => {
      let isValid = service.isCreditCardValid(invalidCreditCard);
      expect(isValid).toBe(false);
    });
  });
});
