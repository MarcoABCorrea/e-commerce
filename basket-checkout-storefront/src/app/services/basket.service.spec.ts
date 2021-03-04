import { TestBed } from '@angular/core/testing';
import { Product } from '../core/models/product.model';
import { BasketService } from './basket.service';

describe('BasketService', () => {
  let service: BasketService;
  const product: Product = {
    sku: 9,
    name: 'Product Nine',
    description: 'Product Nine description',
    price: 9.99,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#changeProductQuantity()', () => {
    it('should update product on basket with given quantity', () => {
      service.addProduct(product);
      expect(service.products.length).toBe(1);
      expect(service.products[0].quantity).toBe(1);

      service.changeProductQuantity(5, product);
      expect(service.products[0].quantity).toBe(5);
    });
  });

  describe('#getBasketItems()', () => {
    it('should return "Array<BasketItem>" corresponding to the products added to basket', () => {
      service.addProduct(product);
      let basket = service.getBasketItems();
      expect(basket.length).toBe(1);
      expect(basket[0].sku).toBe(9);
      expect(basket[0].quantity).toBe(1);
    });
  });
});
