import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../proxy/quizzes/quiz.service';
import { StartQuizDto } from '../../proxy/quizzes/models';

@Component({
  selector: 'app-start-quiz-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-quiz-card.html',
  styleUrls: ['./start-quiz-card.scss']
})
export class StartQuizCardComponent {
  private quizService = inject(QuizService);
  private router = inject(Router);
  loading = false;

  startQuiz() {
    this.loading = true;
    const input: StartQuizDto = {
      questionCount: 5,
      // subjectId: undefined, // Random
      // difficulty: undefined // Random
    };

    this.quizService.startQuiz(input).subscribe({
      next: (quiz) => {
        this.loading = false;
        this.router.navigate(['/quiz', quiz.id]);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}
