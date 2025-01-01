import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyRegisterComponent } from './currency-register.component';

describe('CurrencyRegisterComponent', () => {
  let component: CurrencyRegisterComponent;
  let fixture: ComponentFixture<CurrencyRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
