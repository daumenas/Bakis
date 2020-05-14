import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPrizePageComponent } from './user-prize-page.component';

describe('UserPrizePageComponent', () => {
  let component: UserPrizePageComponent;
  let fixture: ComponentFixture<UserPrizePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPrizePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPrizePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
