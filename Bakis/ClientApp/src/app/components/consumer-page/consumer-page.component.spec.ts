import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerPageComponent } from './consumer-page.component';

describe('ConsumerPageComponent', () => {
  let component: ConsumerPageComponent;
  let fixture: ComponentFixture<ConsumerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
