import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarExpansionPanelComponent } from './navbar-expansion-panel.component';

describe('NavbarExpansionPanelComponent', () => {
  let component: NavbarExpansionPanelComponent;
  let fixture: ComponentFixture<NavbarExpansionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarExpansionPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
