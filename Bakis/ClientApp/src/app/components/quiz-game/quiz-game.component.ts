import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { BaseQuizQuestion } from '../../models/base-quiz-question';
import { BaseQuizQuestionChoice } from '../../models/base-quiz-question-choice';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewQuizQuestionChoice } from '../../models/new-quiz-question-choice';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz-game',
  templateUrl: './quiz-game.component.html',
  styleUrls: ['../dialog-style/dialog-style.component.css']
})
export class QuizGameComponent implements OnInit {
  htmlToAdd: string;
  startingQuestion: number;
  correctAnswer: number;
  question: string;
  pointsGained: number;
  pointValue: number;
  incorrectText: string;
  questionNumber: number;
  displayedNowNumber: number;
  displayedEndNumber: number;
  correctAnswerTitle: NewQuizQuestionChoice;
  answers: BaseQuizQuestionChoice[]; 

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private questionService: QuestionService,
    private quizService: QuizService,
    public snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<QuizGameComponent>, ) { }


  ngOnInit(): void {
    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick().subscribe(() => {
      if (confirm('Are you sure you want to close it? This game will not be available anymore.')) {
        this.dialogRef.close();
      }
    });
    this.question = "";
    this.answers;

    this.startingQuestion = 0;
    this.pointsGained = 0;
    this.incorrectText = "";
    this.loadQuestion();
  }

  loadQuestion() {
    this.displayedNowNumber = this.startingQuestion + 1;
    this.quizService.getQuiz(this.data.quizId).subscribe(quiz => {
      this.correctAnswer = quiz.questions[this.startingQuestion].correctAnswer;
      this.question = quiz.questions[this.startingQuestion].name;
      this.answers = quiz.questions[this.startingQuestion].questionChoices;
      this.questionNumber = quiz.questions.length - 1;
      this.displayedEndNumber = quiz.questions.length;
      this.pointValue = questions[this.startingQuestion].points;
    })
  }

  checkAnswer(id) {
    if (this.correctAnswer === id) {
      this.pointsGained = this.pointsGained + this.pointValue;
      this.snackbar.open("Correct! You collected: " + this.pointsGained, null, {
          duration: 1500
        });
    } else {
      this.correctAnswerTitle = this.answers.find(e => e.id == this.correctAnswer);
      this.snackbar.open("Incorrect, Correct answer: " + this.correctAnswerTitle.title, null, {
          duration: 1500
        });
    }
    if (this.startingQuestion === this.questionNumber) {
      this.dialogRef.close(this.pointsGained);
    } else {
      this.startingQuestion = this.startingQuestion + 1;
      this.loadQuestion();
    }
  }

}
