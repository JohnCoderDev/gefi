import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGainVsLossComponent } from './dashboard-gain-vs-loss.component';

describe('DashboardGainVsLossComponent', () => {
  let component: DashboardGainVsLossComponent;
  let fixture: ComponentFixture<DashboardGainVsLossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardGainVsLossComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardGainVsLossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
