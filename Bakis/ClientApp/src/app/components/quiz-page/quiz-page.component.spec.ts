import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SightPageComponent } from './sight-page.component';

describe('SightPageComponent', () => {
  let component: SightPageComponent;
  let fixture: ComponentFixture<SightPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SightPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SightPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
