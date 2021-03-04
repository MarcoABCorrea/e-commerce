import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CheckoutResponseComponent } from './checkout-response.component';

describe('CheckoutResponseComponent', () => {
  let component: CheckoutResponseComponent;
  let fixture: ComponentFixture<CheckoutResponseComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutResponseComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ response: JSON.stringify({ msg: 'success' }) }),
          },
        },
      ],
      imports: [RouterTestingModule.withRoutes([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutResponseComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
