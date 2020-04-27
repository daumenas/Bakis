import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './home/home.component';
import { ConsumerPageComponent } from './components/consumer-page/consumer-page.component';
import { EventPageComponent } from './components/event-page/event-page.component';
import { SightPageComponent } from './components/sight-page/sight-page.component';
import { BaseEventComponent } from './components/base-event/base-event.component';
import { UserEditDialogComponent } from './components/user-edit-dialog/user-edit-dialog.component';
import { AuthGuardService } from './services/auth-guard.service';
import { RoleGuardService } from './services/role-guard.service';
import { QuizPageComponent } from './components/quiz-page/quiz-page.component';

export const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
];

export const APP_ROUTES_CONSUMER: Routes = [
];

export const APP_ROUTES_ADMIN: Routes = [
  { path: 'consumerpage', component: ConsumerPageComponent, canActivate: [RoleGuardService] },
  { path: 'eventpage', component: EventPageComponent, canActivate: [RoleGuardService] },
  { path: 'quizpage', component: QuizPageComponent, canActivate: [RoleGuardService] },
  { path: 'sightpage', component: SightPageComponent, canActivate: [RoleGuardService] },
  { path: 'baseevent', component: BaseEventComponent, canActivate: [RoleGuardService] },
  { path: 'editevent', component: UserEditDialogComponent, canActivate: [RoleGuardService] }
];

export const APP_ROUTES_EVENT_MANAGER: Routes = [
];
