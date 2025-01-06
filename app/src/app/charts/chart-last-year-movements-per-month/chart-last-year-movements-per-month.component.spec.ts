import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartLastYearMovementsPerMonthComponent } from './chart-last-year-movements-per-month.component';

describe('ChartLastYearMovementsPerMonthComponent', () => {
  let component: ChartLastYearMovementsPerMonthComponent;
  let fixture: ComponentFixture<ChartLastYearMovementsPerMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartLastYearMovementsPerMonthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartLastYearMovementsPerMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
