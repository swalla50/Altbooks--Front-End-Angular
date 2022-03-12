import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionadduserComponent } from './questionadduser.component';

describe('QuestionadduserComponent', () => {
  let component: QuestionadduserComponent;
  let fixture: ComponentFixture<QuestionadduserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionadduserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionadduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
