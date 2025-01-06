import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestMovementsTableComponent } from './latest-movements-table.component';

describe('LatestMovementsTableComponent', () => {
  let component: LatestMovementsTableComponent;
  let fixture: ComponentFixture<LatestMovementsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestMovementsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestMovementsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
