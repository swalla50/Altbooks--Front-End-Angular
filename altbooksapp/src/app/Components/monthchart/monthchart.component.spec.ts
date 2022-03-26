import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthchartComponent } from './monthchart.component';

describe('MonthchartComponent', () => {
  let component: MonthchartComponent;
  let fixture: ComponentFixture<MonthchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthchartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
