import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartMainSpentsCategoriesComponent } from './chart-main-spents-categories.component';

describe('ChartMainSpentsCategoriesComponent', () => {
  let component: ChartMainSpentsCategoriesComponent;
  let fixture: ComponentFixture<ChartMainSpentsCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartMainSpentsCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartMainSpentsCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
