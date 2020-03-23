import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSightComponent } from './add-sight.component';

describe('AddSightComponent', () => {
  let component: AddSightComponent;
  let fixture: ComponentFixture<AddSightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
