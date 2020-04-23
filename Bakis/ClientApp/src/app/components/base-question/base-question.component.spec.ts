import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseEventComponent } from './base-event.component';

describe('AddEventComponent', () => {
  let component: BaseEventComponent;
  let fixture: ComponentFixture<BaseEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BaseEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
