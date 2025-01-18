import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementRegisterComponent } from './movement-register.component';

describe('MovementRegisterComponent', () => {
  let component: MovementRegisterComponent;
  let fixture: ComponentFixture<MovementRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovementRegisterComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MovementRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
