import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConsumerPageComponent } from './components/consumer-page/consumer-page.component';
import { EventPageComponent } from './components/event-page/event-page.component';
import { SightPageComponent } from './components/sight-page/sight-page.component';
import { AddSightComponent } from './components/add-sight/add-sight.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { UserEditDialogComponent } from './components/user-edit-dialog/user-edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LogInComponent,
    RegisterComponent,
    ConsumerPageComponent,
    EventPageComponent,
    SightPageComponent,
    AddSightComponent,
    AddEventComponent,
    UserEditDialogComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'login', component: LogInComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'consumerpage', component: ConsumerPageComponent },
      { path: 'eventpage', component: EventPageComponent },
      { path: 'sightpage', component: SightPageComponent },
      { path: 'addevent', component: AddEventComponent },
      { path: 'editevent', component: UserEditDialogComponent }
    ]),
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
