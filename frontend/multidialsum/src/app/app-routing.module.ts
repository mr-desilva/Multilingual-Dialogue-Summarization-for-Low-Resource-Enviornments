import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummaryComponentComponent } from './summary-component/summary-component.component';
import { SummaryComponentEnglishComponent } from './summary-component-english/summary-component-english.component';

const routes: Routes = [
  { path: '', redirectTo: '/english-summary', pathMatch: 'full' },
  { path: 'english-summary', component: SummaryComponentEnglishComponent },
  { path: 'multilingual-summary', component: SummaryComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
