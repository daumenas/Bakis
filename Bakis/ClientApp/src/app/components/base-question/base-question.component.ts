import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder, ControlValueAccessor, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../services/quiz.service';
import { QuestionService } from '../../services/question.service';
import { QuestionChoiceService } from '../../services/question-choice.service';
import { BaseQuizQuestion } from '../../models/base-quiz-question';
import { NewQuizQuestion } from '../../models/new-quiz-question';
import { BaseQuizQuestionChoice } from '../../models/base-quiz-question-choice';
import { ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { SendReceiveService } from '../../services/send-receive.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-base-question',
  templateUrl: './base-question.component.html',
  styleUrls: ['../dialog-style/dialog-style.component.css']
})

export class BaseQuestionComponent implements OnInit, ControlValueAccessor {
  @Input() questionChoicesSelected: BaseQuizQuestionChoice[] = [];
  questionChoiceControl = new FormControl();
  baseQuestionForm: FormGroup;
  buttonText: string;
  titleText: string;
  dialogRef: any;
  snackbarText: string = "Quiz Question Added";

  readonly separatorKeysCodes: number[] = [ENTER];

  @ViewChild('questionChoiceInput') questionChoiceInput: ElementRef<HTMLInputElement>;

  constructor(
    private translate: TranslateService,
    private questionService: QuestionService,
    private questionChoiceService: QuestionChoiceService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private sendReceiveService: SendReceiveService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit() {
    if (this.data.submitEvent == undefined) {
      this.buttonText = this.translate.instant('modal.addQuestion');
      this.titleText = this.translate.instant('modal.newQuestion');
    } else {
      this.buttonText = this.data.submitEvent;
      this.titleText = this.data.submitEvent;
      this.snackbarText = this.translate.instant('snackbar.questionSubmitted');
    }
    if (this.data.isEdit == undefined) {
      this.baseQuestionForm = this.formBuilder.group({
        name: ['', [
          Validators.required
        ]],
        points: ['', [
          Validators.required
        ]],
        title: ['', [
          Validators.required
        ]],
        correctAnswer: ['', [
          Validators.required
        ]],
        questionChoices: this.formBuilder.array([])
      });
    }
    else {
      this.buttonText = this.translate.instant('modal.editQuestion');
      this.titleText = this.translate.instant('modal.editQuestion');
      this.baseQuestionForm = this.formBuilder.group({
          name: [this.data.question.name, [
            Validators.required
          ]],
        points: [this.data.question.points, [
            Validators.required
          ]],
        title: [this.data.question.title, [
            Validators.required
          ]],
        correctAnswer: [this.data.question.correctAnswer, [
            Validators.required
        ]],
        questionChoices: this.formBuilder.array([])
      });
      this.questionChoicesSelected = this.data.question.questionChoices;
    }
    this.syncQuestionChoicesToForm();
  }

  getFormQuestionData(): BaseQuizQuestion {
    const formUserData = Object.assign(this.baseQuestionForm.value);
    return formUserData;
  }

  addNewQuestion(newQuestion: NewQuizQuestion) {
    this.questionService.registerQuestion(newQuestion).subscribe(() => {
      this.sendReceiveService.pointSender(true);
    });
  }

  editQuestion(editQuestion: NewQuizQuestion) {
    this.questionService.editQuestion(editQuestion, this.data.questionToEdit.id).subscribe(() => {
      this.sendReceiveService.pointSender(true);
    });
  }

  onSubmit() {
    if (this.data.isEdit == undefined) {
      const question = this.getFormQuestionData();
      this.addNewQuestion(question);
      if (this.baseQuestionForm.valid) {
        this.snackbar.open(this.snackbarText, null, {
          duration: 1500
        });
      }
      this.questionService.registerQuestion(question);
    }
    else {
      const question = this.getFormQuestionData();     
      if (this.baseQuestionForm.valid) {
        this.snackbar.open(this.translate.instant('snackbar.questionEdited'), null, {
          duration: 1500
        });
      }
      this.editQuestion(question);
    }
  }

  writeValue(value: any) {
    if (value) {
      this.baseQuestionForm.patchValue(value);
    }
  }
  registerOnChange(fn: any) {
    this.baseQuestionForm.valueChanges.subscribe(fn);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const questionChoiceTitle = event.value;
    this.questionChoiceService.registerQuestionChoice({ title: questionChoiceTitle }).subscribe(id => {
      this.questionChoicesSelected.push({ id: Number(id), title: questionChoiceTitle });
        this.updateFormQuestionChoices();
      });
  }

  remove(questionChoice: BaseQuizQuestionChoice): void {

    const index = this.questionChoicesSelected.indexOf(questionChoice);
    if (index >= 0) {
      this.questionChoicesSelected.splice(index, 1);
    }
    this.updateFormQuestionChoices();
  }

  get questionChoices() {
    return this.baseQuestionForm.get('questionChoices') as FormArray;
  }

  syncQuestionChoicesToForm(): void {
    this.questionChoicesSelected.forEach(questionChoice => {
      this.questionChoices.push(this.formBuilder.control({ id: questionChoice.id, title: questionChoice.title }));
    });
  }

  removeQuestionChoices(): void {
    this.questionChoices.clear();
  }

  updateFormQuestionChoices(): void {
    this.removeQuestionChoices();
    this.syncQuestionChoicesToForm();
  }

  registerOnTouched(fn: any): void {
    throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

}
