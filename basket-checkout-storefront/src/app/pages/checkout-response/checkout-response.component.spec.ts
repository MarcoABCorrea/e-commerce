import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutResponseComponent } from './checkout-response.component';

describe('CheckoutResponseComponent', () => {
  let component: CheckoutResponseComponent;
  let fixture: ComponentFixture<CheckoutResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
