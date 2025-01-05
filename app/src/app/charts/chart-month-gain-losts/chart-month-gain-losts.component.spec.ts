import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartMonthGainLostsComponent } from './chart-month-gain-losts.component';

describe('ChartMonthGainLostsComponent', () => {
  let component: ChartMonthGainLostsComponent;
  let fixture: ComponentFixture<ChartMonthGainLostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartMonthGainLostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartMonthGainLostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
