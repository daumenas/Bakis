import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventUserListComponent } from './event-user-list.component';

describe('EventUserListComponent', () => {
  let component: EventUserListComponent;
  let fixture: ComponentFixture<EventUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
