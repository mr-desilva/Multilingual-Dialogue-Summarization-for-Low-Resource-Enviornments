import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { SummaryComponentComponent } from './summary-component/summary-component.component';
import { SummaryNavigationComponent } from './summary-navigation/summary-navigation.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SummaryComponentEnglishComponent } from './summary-component-english/summary-component-english.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SummaryComponentComponent,
    SummaryNavigationComponent,
    WelcomeComponent,
    SummaryComponentEnglishComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
