import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BasketService, CheckoutService, ProductService } from '@services';
import { of } from 'rxjs';
import { BasketCheckoutComponent } from './basket-checkout.component';

describe('BasketCheckoutComponent', () => {
  let component: BasketCheckoutComponent;
  let fixture: ComponentFixture<BasketCheckoutComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasketCheckoutComponent],
      providers: [
        {
          provide: BasketService,
          useValue: {
            getBasketItems: () => of([]),
            products: [],
          },
        },
        {
          provide: CheckoutService,
          useValue: {
            isCreditCardValid: () => true,
          },
        },
        {
          provide: ProductService,
          useValue: {
            applyPromoCode: () => of({}),
            currentPromoCode: { code: 'X10', discount: 10 },
          },
        },
      ],
      imports: [RouterTestingModule.withRoutes([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketCheckoutComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
