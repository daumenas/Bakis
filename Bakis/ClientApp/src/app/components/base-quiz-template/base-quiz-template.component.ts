import { Component, OnInit, Input } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder, ControlValueAccessor, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';
import { QuizService } from '../../services/quiz.service';
import { QuestionService } from '../../services/question.service';
import { QuestionChoiceService } from '../../services/question-choice.service';
import { BaseQuizTemplate } from '../../models/base-quiz-template';
import { NewQuizTemplate } from '../../models/new-quiz-template';
import { BaseQuizQuestion } from '../../models/base-quiz-question';
import { MatTableDataSource } from '@angular/material/table';
import { BaseQuestionComponent } from '../base-question/base-question.component';
import { BaseSight } from '../../models/base-sight';
import { LocationService } from '../../services/location.service';
import { SendReceiveService } from '../../services/send-receive.service';


@Component({
  selector: 'app-base-quiz-template',
  templateUrl: './base-quiz-template.component.html',
  styleUrls: ['../dialog-style/dialog-style.component.css']
})

export class BaseQuizTemplateComponent implements OnInit, ControlValueAccessor {
  questionArray: BaseQuizQuestion[];
  questionToUpdate: BaseQuizQuestion;
  questionsSelected: BaseQuizQuestion[];
  allSights: BaseSight[];

  listOfData: BaseQuizQuestion[] = [];
  questionsDataSource = new MatTableDataSource(this.listOfData);

  questions = new FormControl();

  baseQuizTemplateForm: FormGroup;
  buttonText: string;
  titleText: string;
  dialogRef: any;
  snackbarText: string = "Quiz Template Added";

  constructor(
    private quizTemplateService: QuizService,
    private questionService: QuestionService,
    private sightService: LocationService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private sendReceiveService: SendReceiveService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit() {
    if (this.data.submitEvent == undefined) {
      this.buttonText = "Add Quiz";
      this.titleText = "New Quiz";
    } else {
      this.buttonText = this.data.submitEvent;
      this.titleText = this.data.submitEvent;
      this.snackbarText = "Quiz Submitted"
    }
    if (this.data.isEdit == undefined) {
      this.sightService.getAllSightsWithoutQuiz().subscribe(sights => {
        this.allSights = sights;
      });
      this.questionService.getAllQuestions().subscribe(questions => {
        this.questionArray = questions;
      });
      this.baseQuizTemplateForm = this.formBuilder.group({
        title: ['', [
          Validators.required
        ]],
        questions: [],
        sightId: ['', [Validators.required]]
      });
    }
    else {
      this.sightService.getAllSights().subscribe(sights => {
        this.allSights = sights;
      });
      this.questionService.getAllEmptyAndQuizQuestionChoices(this.data.quizId).subscribe(question => {
        this.questionArray = question;
      });
      this.buttonText = "Submit";
      this.titleText = "Edit Quiz";
        this.baseQuizTemplateForm = this.formBuilder.group({
          title: [this.data.quizTemplateToUpdate.title, [
          Validators.required
        ]],
          questions: [this.data.quizTemplateToUpdate.questions],
          sightId: [this.data.quizTemplateToUpdate.sightId, [Validators.required]]
        });
    }
  }

  getFormQuizTemplateData(): BaseQuizTemplate {
    const formUserData = Object.assign(this.baseQuizTemplateForm.value);
    return formUserData;
  }

  addNewQuizTemplate(newQuiz: NewQuizTemplate) {
    this.quizTemplateService.registerQuizTemplate(newQuiz).subscribe(() => {
      this.sendReceiveService.pointSender(true);
    });
  }

  editQuizTemplate(editQuiz: NewQuizTemplate) {
    this.quizTemplateService.editQuizTemplates(editQuiz, this.data.quizTemplateToUpdate.id).subscribe(() => {
      this.sendReceiveService.pointSender(true);
    });
  }

  onSubmit() {
    if (this.data.isEdit == undefined) {
      const quizTemplate = this.getFormQuizTemplateData();
      this.addNewQuizTemplate(quizTemplate);
      if (this.baseQuizTemplateForm.valid) {
        this.snackbar.open(this.snackbarText, null, {
          duration: 1500
        });
      }
      this.quizTemplateService.registerQuizTemplate(quizTemplate);
    }
    else {
      const quizTemplate = this.getFormQuizTemplateData();     
      if (this.baseQuizTemplateForm.valid) {
        this.snackbar.open("Quiz template edited", null, {
          duration: 1500
        });
      }
      this.editQuizTemplate(quizTemplate);
    }
  }

  addQuestion(): void {
    const dialogRef = this.dialog.open(BaseQuestionComponent, {
      width: '550px',
      data: {
        baseQuestion: this.questionArray
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.questionService.getAllQuestions().subscribe(questions => {
        this.questionArray = questions;
      });
    });
  }

  writeValue(value: any) {
    if (value) {
      this.baseQuizTemplateForm.patchValue(value);
    }
  }
  registerOnChange(fn: any) {
    this.baseQuizTemplateForm.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

}
