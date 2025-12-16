import type { QuestionDifficulty } from '../question-difficulty.enum';
import type { EntityDto } from '@abp/ng.core';
import type { QuizStatus } from '../quiz-status.enum';

export interface AnswerOptionDto {
  id?: string;
  content?: string;
  letter?: string;
}

export interface AnswerQuestionDto {
  quizId: string;
  selectedAnswerId: string;
}

export interface AnswerResultDto {
  isCorrect: boolean;
  xpEarned: number;
  currentStreak: number;
  correctAnswerId?: string;
  explanation?: string;
  quizCompleted: boolean;
  correctAnswersCount: number;
  totalQuestionsAnswered: number;
}

export interface CurrentQuizQuestionDto {
  questionNumber: number;
  totalQuestions: number;
  currentStreak: number;
  subjectName?: string;
  subjectColor?: string;
  difficulty?: QuestionDifficulty;
  content?: string;
  mediaUrl?: string;
  points: number;
  timeLimitSeconds: number;
  answers: AnswerOptionDto[];
}

export interface QuizDto extends EntityDto<string> {
  studentId?: string;
  subjectId?: string;
  subjectName?: string;
  difficulty?: QuestionDifficulty;
  totalQuestions: number;
  correctAnswers: number;
  totalXpEarned: number;
  currentStreak: number;
  highestStreak: number;
  startedAt?: string;
  completedAt?: string;
  status?: QuizStatus;
  currentQuestionIndex: number;
  accuracy: number;
  elapsedTime?: string;
  questions: QuizQuestionDto[];
}

export interface QuizQuestionDto {
  id?: string;
  questionId?: string;
  order: number;
  selectedAnswerId?: string;
  isCorrect?: boolean;
  xpEarned: number;
  answeredAt?: string;
}

export interface StartQuizDto {
  questionCount: number;
  subjectId?: string;
  difficulty?: QuestionDifficulty;
}
