import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { BaseQuizQuestion } from '../../models/base-quiz-question';
import { BaseQuizQuestionChoice } from '../../models/base-quiz-question-choice';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  answers: BaseQuizQuestionChoice[]; 

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private questionService: QuestionService,
    public snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<QuizGameComponent>, ) { }


  ngOnInit(): void {
    this.question = "";
    this.answers;
    this.startingQuestion = 0;
    this.pointsGained = 0;
    this.incorrectText = "";
    this.loadQuestion();
  }

  loadQuestion() {
    this.displayedNowNumber = this.startingQuestion + 1;
    this.questionService.getAllQuestionsByQuizId(this.data.quizId, this.data.quizName).subscribe(questions => {
      this.correctAnswer = questions[this.startingQuestion].correctAnswer;
      this.pointValue = questions[this.startingQuestion].points;
      this.question = questions[this.startingQuestion].name;
      this.answers = questions[this.startingQuestion].questionChoices;
      this.questionNumber = questions.length - 1;
      this.displayedEndNumber = questions.length;
    })
  }

  checkAnswer(id, title) {
    if (this.correctAnswer === id) {
      this.pointsGained = this.pointsGained + this.pointValue;
      this.snackbar.open("Correct! You collected: " + this.pointsGained, null, {
          duration: 1500
        });
      } else {
        this.snackbar.open("Incorrect, Correct answer: " + title, null, {
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
