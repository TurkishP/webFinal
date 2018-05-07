import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroSearchComponent }  from './hero-search/hero-search.component';
import { HeroService }          from './hero.service';
import { MessageService }       from './message.service';
import { MessagesComponent }    from './messages/messages.component';
import { MaterialModule } from './material.module';
import { LoginComponent } from './login/login.component';

// import { AddHeroComponent } from './add-hero/add-hero.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToastNotificationComponent } from './toast-notification/toast-notification.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
// export const firebase = environment.firebase;
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

var firebaseConfig: {
  apiKey: "AIzaSyDfvfrCuPfxn2FkkwbWJrO-azqXq0rrlrc",
  authDomain: "webfinal-8f09e.firebaseapp.com",
  databaseURL: "https://webfinal-8f09e.firebaseio.com",
  projectId: "webfinal-8f09e",
  storageBucket: "",
  messagingSenderId: "355256297947"
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireModule,


    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent,
    LoginComponent,
    // AddHeroComponent,
    // ToastNotificationComponent
  ],
  providers: [ HeroService, MessageService,
    // {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}} 
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }