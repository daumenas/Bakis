import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocationService } from '../../services/location.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BaseQuizQuestion } from '../../models/base-quiz-question';
import { QuizService } from '../../services/quiz.service';
import { BaseQuizTemplate } from '../../models/base-quiz-template';
import { NewQuizTemplate } from '../../models/new-quiz-template';
import { BaseQuizTemplateComponent } from '../base-quiz-template/base-quiz-template.component';
import { QuestionService } from '../../services/question.service';
import { QuizGameComponent } from '../quiz-game/quiz-game.component';
import { SendReceiveService } from '../../services/send-receive.service';
import { BaseQuestionComponent } from '../base-question/base-question.component';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})
export class QuizPageComponent implements OnInit {
  quizTemplates: BaseQuizTemplate[];
  questions: BaseQuizQuestion[];
  quizTemplateToUpdate: BaseQuizTemplate;

  quizQuestion: BaseQuizQuestion[] = [];

  baseQuiz: BaseQuizQuestion[] = [];

  listOfQuizData: BaseQuizTemplate[] = [];
  listOfQuestionData: BaseQuizQuestion[] = [];

  displayedColumnsQuiz: string[] = ['id', 'title', 'sightName', 'questions', 'preview', 'actions'];
  displayedColumnsQuestions: string[] = ['id', 'name', 'title', 'choices', 'correct', 'points', 'actions'];

  quizTemplatesDataSource = new MatTableDataSource(this.listOfQuizData);
  questionTemplatesDataSource = new MatTableDataSource(this.listOfQuestionData);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private questionService: QuestionService,
    private quizService: QuizService,
    private sendReceiveService: SendReceiveService
  ) { }

  ngOnInit() {
    this.refreshTable();
    this.sendReceiveService.pointsReceive$.subscribe((data) => {
      this.refreshTable();
    });
  }

  refreshTable() {
    this.quizService.getAllQuizTemplates().subscribe(quizTemplates => {
      this.quizTemplates = quizTemplates;
      this.listOfQuizData = [...this.quizTemplates];
      this.quizTemplatesDataSource = new MatTableDataSource(this.listOfQuizData);
      this.quizTemplatesDataSource.paginator = this.paginator;
      this.quizTemplatesDataSource.sort = this.sort;
    });
    this.questionService.getAllQuestions().subscribe(questions => {
      console.log(questions);
      this.questions = questions;
      this.listOfQuestionData = [...this.questions];
      this.questionTemplatesDataSource = new MatTableDataSource(this.listOfQuestionData);
      this.questionTemplatesDataSource.paginator = this.paginator;
    });
  }

  getQuestionTitles(quiz) {
    return quiz.questions.map(r => r.title);
  }

  getQuestionChoices(question) {
    return question.questionChoices.map(r => r.title);
  }

  getQuestionCorrectAnswer(question) {
    return question.questionChoices.find(choices => {
      return choices.id === question.correctAnswer;
    }).title;
  }

  showUnexpectedError(): void {
    error => {
      this.showUnexpectedError();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.quizTemplatesDataSource.filter = filterValue.trim().toLowerCase();
  }

  applyQuestionFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.questionTemplatesDataSource.filter = filterValue.trim().toLowerCase();
  }

  registerQuizTemplate(newQuizTemplate: NewQuizTemplate) {
    this.quizService.registerQuizTemplate(newQuizTemplate).subscribe(() => {
      this.refreshTable();
    }, error => {
      this.showUnexpectedError();
    });
  }

  openAddForm(): void {
    const dialogRef = this.dialog.open(BaseQuizTemplateComponent, {
      width: '550px',
      data: {
        baseQuiz: this.quizTemplates
      }
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  openEditForm(quizTemplate: BaseQuizTemplate): void {
    this.quizTemplateToUpdate = Object.assign(quizTemplate);
    const dialogRef = this.dialog.open(BaseQuizTemplateComponent, {
      width: '550px',
      data: {
        isEdit: true,
        quizTemplateToUpdate: this.quizTemplateToUpdate,
        quizId: this.quizTemplateToUpdate.id
      }
    });
    dialogRef.afterClosed().subscribe(() => {
    });
  }

  openPreviewForm(quizTemplate: BaseQuizTemplate): void {
    this.quizTemplateToUpdate = Object.assign(quizTemplate);
    const dialogRef = this.dialog.open(QuizGameComponent, {
      width: '550px',
      data: {
        questions: this.quizTemplateToUpdate.questions,
        quizId: this.quizTemplateToUpdate.id,
        quizName: this.quizTemplateToUpdate.title
      }
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  openNewQuestionForm(): void {
    const dialogRef = this.dialog.open(BaseQuestionComponent, {
      width: '550px',
      data: {
      }
    });
    dialogRef.afterClosed().subscribe(() => {
    });
  }

  openEditQuestionForm(questionTemplate: BaseQuizQuestion): void {
    const dialogRef = this.dialog.open(BaseQuestionComponent, {
      width: '550px',
      data: {
        isEdit: true,
        question: questionTemplate
      }
    });
    dialogRef.afterClosed().subscribe(() => {
    });
  }

  editQuizTemplate(quizTemplate: NewQuizTemplate, id: number) {
    this.quizService.editQuizTemplates(quizTemplate, id).subscribe(() => {
      this.refreshTable();
    }, error => {
      this.showUnexpectedError();
    });
  }

  showQuizDeleteConfirm(quizTemplateToDelete: BaseQuizTemplate): void {
    if (confirm('If you confirm,' + quizTemplateToDelete.name + ' will be permanently deleted.')) {
      this.deleteQuizById(quizTemplateToDelete.id)
    }
  }

  deleteQuizById(id: number) {
    this.quizService.deleteQuizTemplate(id).subscribe(() => {
      this.refreshTable();
    });
  }
  showQuestionDeleteConfirm(questionTemplateToDelete: BaseQuizQuestion): void {
    console.log(questionTemplateToDelete);
    if (confirm('If you confirm,' + questionTemplateToDelete.name + ' will be permanently deleted.')) {
      this.deleteQuestionById(questionTemplateToDelete.id)
    }
  }

  deleteQuestionById(id: number) {
    this.questionService.deleteQuestion(id).subscribe(() => {
      this.refreshTable();
    });
  }
}
