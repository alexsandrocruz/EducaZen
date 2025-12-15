import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartQuizCard } from './start-quiz-card';

describe('StartQuizCard', () => {
  let component: StartQuizCard;
  let fixture: ComponentFixture<StartQuizCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartQuizCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartQuizCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
