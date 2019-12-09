import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialDateComponent } from './special-date.component';

describe('SpecialDateComponent', () => {
  let component: SpecialDateComponent;
  let fixture: ComponentFixture<SpecialDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
