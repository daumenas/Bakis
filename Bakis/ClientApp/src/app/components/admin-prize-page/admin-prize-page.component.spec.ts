import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPrizePageComponent } from './admin-prize-page.component';

describe('AdminPrizePageComponent', () => {
  let component: AdminPrizePageComponent;
  let fixture: ComponentFixture<AdminPrizePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPrizePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPrizePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
