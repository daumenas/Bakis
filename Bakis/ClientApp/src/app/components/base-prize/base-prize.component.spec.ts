import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasePrizeComponent } from './base-prize.component';

describe('BasePrizeComponent', () => {
  let component: BasePrizeComponent;
  let fixture: ComponentFixture<BasePrizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasePrizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasePrizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
