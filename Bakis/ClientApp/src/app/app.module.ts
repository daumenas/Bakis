import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ConsumerPageComponent } from './components/consumer-page/consumer-page.component';
import { EventPageComponent } from './components/event-page/event-page.component';
import { SightPageComponent } from './components/sight-page/sight-page.component';
import { BaseEventComponent } from './components/base-event/base-event.component';
import { UserEditDialogComponent } from './components/user-edit-dialog/user-edit-dialog.component';
import { BaseSightComponent } from './components/base-sight/base-sight.component'
import { BaseQuizTemplateComponent } from './components/base-quiz-template/base-quiz-template.component'

import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSortModule } from '@angular/material/sort';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import { APP_ROUTES } from './app-routing.module';
import { APP_ROUTES_ADMIN } from './app-routing.module';
import { APP_ROUTES_CONSUMER } from './app-routing.module';
import { APP_ROUTES_EVENT_MANAGER } from './app-routing.module';
import { AuthGuardService } from './services/auth-guard.service';
import { RoleGuardService } from './services/role-guard.service';
import { MapComponent } from './components/map/map.component';
import { QuizPageComponent } from './components/quiz-page/quiz-page.component';
import { BaseQuizTemplate } from './models/base-quiz-template';
import { BaseQuestionComponent } from './components/base-question/base-question.component';
import { SubmitEventComponent } from './components/submit-event/submit-event.component';
import { QuizGameComponent } from './components/quiz-game/quiz-game.component';
import { PictureGameComponent } from './components/picture-game/picture-game.component';
import { AdminPrizePageComponent } from './components/admin-prize-page/admin-prize-page.component';
import { BasePrizeComponent } from './components/base-prize/base-prize.component';
import { UserPrizePageComponent } from './components/user-prize-page/user-prize-page.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { EventUserListComponent } from './components/event-user-list/event-user-list.component';
import { AdminPrizeListPageComponent } from './components/admin-prize-list-page/admin-prize-list-page.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

export function TranslationLoaderFactory(http: HttpClient) {
      return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LogInComponent,
    RegisterComponent,
    ConsumerPageComponent,
    EventPageComponent,
    QuizPageComponent,
    BaseQuizTemplateComponent,
    BaseQuestionComponent,
    SightPageComponent,
    BaseEventComponent,
    UserEditDialogComponent,
    BaseSightComponent,
    MapComponent,
    SubmitEventComponent,
    QuizGameComponent,
    PictureGameComponent,
    AdminPrizePageComponent,
    BasePrizeComponent,
    UserPrizePageComponent,
    EventUserListComponent,
    AdminPrizeListPageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatDialogModule,
    MatTooltipModule,
    MatListModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatCardModule,
    MatSnackBarModule,
    MatBadgeModule,
    NgxMaterialTimepickerModule.setLocale('lt-LT'),
    MatSortModule,

    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(APP_ROUTES),
    RouterModule.forRoot(APP_ROUTES_ADMIN),
    RouterModule.forRoot(APP_ROUTES_CONSUMER),
    RouterModule.forRoot(APP_ROUTES_EVENT_MANAGER),
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['http://localhost:4200'],
        blacklistedRoutes: ['example.com/examplebadroute/']
      }
    }),
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useFactory: TranslationLoaderFactory, deps: [HttpClient] }
    }),
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthGuardService,
    RoleGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
