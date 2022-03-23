import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SevendaychartComponent } from './sevendaychart.component';

describe('SevendaychartComponent', () => {
  let component: SevendaychartComponent;
  let fixture: ComponentFixture<SevendaychartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SevendaychartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SevendaychartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
