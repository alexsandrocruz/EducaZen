import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../proxy/quizzes/quiz.service';
import { CurrentQuizQuestionDto, AnswerResultDto } from '../../proxy/quizzes/models';

@Component({
  selector: 'app-quiz-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-game.html',
  styleUrls: ['./quiz-game.scss']
})
export class QuizGameComponent implements OnInit {
  private quizService = inject(QuizService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  quizId: string = '';
  currentQuestion: CurrentQuizQuestionDto | null = null;
  loading = true;
  submitting = false;
  lastResult: AnswerResultDto | null = null;

  ngOnInit() {
    this.quizId = this.route.snapshot.params['id'];
    this.loadQuestion();
  }

  loadQuestion() {
    this.loading = true;
    this.quizService.getCurrentQuestion(this.quizId).subscribe({
      next: (res) => {
        this.currentQuestion = res;
        this.loading = false;
        // If no content, maybe quiz finished? Usually backend handles this or returns null?
        // Actually CurrentQuizQuestionDto fields are optional.
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        // Handle game over or error
      }
    });
  }

  submitAnswer(answerId: string) {
    if (this.submitting) return;
    this.submitting = true;

    this.quizService.answer({ quizId: this.quizId, selectedAnswerId: answerId }).subscribe({
      next: (res) => {
        this.lastResult = res;
        this.submitting = false;

        // Show result for a moment then next
        setTimeout(() => {
          this.lastResult = null;
          if (res.quizCompleted) {
            this.router.navigate(['/dashboard']); // or result screen
          } else {
            this.loadQuestion(); // Reload to get next question
          }
        }, 1500);
      },
      error: (err) => {
        this.submitting = false;
        console.error(err);
      }
    });
  }
}
