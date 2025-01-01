import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseWindowComponent } from './base-window.component';

describe('BaseWindowComponent', () => {
  let component: BaseWindowComponent;
  let fixture: ComponentFixture<BaseWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
