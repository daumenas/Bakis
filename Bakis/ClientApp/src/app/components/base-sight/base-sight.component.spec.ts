import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseSightComponent } from './base-sight.component';

describe('BaseSightComponent', () => {
  let component: BaseSightComponent;
  let fixture: ComponentFixture<BaseSightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseSightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseSightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
