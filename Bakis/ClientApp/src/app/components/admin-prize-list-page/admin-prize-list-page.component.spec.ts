import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPrizeListPageComponent } from './admin-prize-list-page.component';

describe('AdminPrizeListPageComponent', () => {
  let component: AdminPrizeListPageComponent;
  let fixture: ComponentFixture<AdminPrizeListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPrizeListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPrizeListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
