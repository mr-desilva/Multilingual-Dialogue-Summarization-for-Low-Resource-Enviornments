import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { InputTextFieldComponent } from './input-text-field/input-text-field.component';
import { SummaryViewerComponent } from './summary-viewer/summary-viewer.component';
import { SummaryComponentComponent } from './summary-component/summary-component.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InputTextFieldComponent,
    SummaryViewerComponent,
    SummaryComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
