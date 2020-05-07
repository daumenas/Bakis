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


@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})
export class QuizPageComponent implements OnInit {
  quizTemplates: BaseQuizTemplate[];
  quizTemplateToUpdate: BaseQuizTemplate;

  quizQuestion: BaseQuizQuestion[] = [];

  baseQuiz: BaseQuizQuestion[] = [];

  listOfData: BaseQuizTemplate[] = [];

  displayedColumns: string[] = ['id', 'title', 'sightName', 'questions', 'actions'];

  quizTemplatesDataSource = new MatTableDataSource(this.listOfData);

  @ViewChild('sightPaginator') paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private questionService: QuestionService,
    private quizService: QuizService,
  ) { }

  ngOnInit() {
    this.refreshTable();
  }

  refreshTable() {
    this.quizService.getAllQuizTemplates().subscribe(quizTemplates => {
      this.quizTemplates = quizTemplates;
      this.listOfData = [...this.quizTemplates];
      this.quizTemplatesDataSource = new MatTableDataSource(this.listOfData);
      this.quizTemplatesDataSource.paginator = this.paginator;
    });
  }

  getQuestionTitles(quiz) {
    return quiz.questions.map(r => r.title);
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
      this.refreshTable();
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
      this.refreshTable();
    });
  }

  editQuizTemplate(quizTemplate: NewQuizTemplate, id: number) {
    this.quizService.editQuizTemplates(quizTemplate, id).subscribe(() => {
      this.refreshTable();
    }, error => {
      this.showUnexpectedError();
    });
  }

  showDeleteConfirm(quizTemplateToDelete: BaseQuizTemplate): void {
    if (confirm('If you confirm,' + quizTemplateToDelete.name + ' will be permanently deleted.')) {
      this.deleteSightById(quizTemplateToDelete.id)
    }
  }

  deleteSightById(id: number) {
    this.quizService.deleteQuizTemplate(id).subscribe(() => {
      this.refreshTable();
    });
  }
}
