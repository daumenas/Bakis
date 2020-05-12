import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureGameComponent } from './picture-game.component';

describe('PictureGameComponent', () => {
  let component: PictureGameComponent;
  let fixture: ComponentFixture<PictureGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
