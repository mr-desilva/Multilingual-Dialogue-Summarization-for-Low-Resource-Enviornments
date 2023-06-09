import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummaryComponentComponent } from './summary-component/summary-component.component';
import { SummaryComponentEnglishComponent } from './summary-component-english/summary-component-english.component';
import { SearchSummaryComponent } from './search-summary/search-summary.component';
import { AboutComponent } from './about/about.component';
import { DocumentationComponent } from './documentation/documentation.component';

const routes: Routes = [
  { path: '', redirectTo: '/english-summary', pathMatch: 'full' },
  { path: 'english-summary', component: SummaryComponentEnglishComponent },
  { path: 'multilingual-summary', component: SummaryComponentComponent },
  { path: 'search-summary', component: SearchSummaryComponent },
  { path: 'about', component: AboutComponent},
  { path: 'documentation', component: DocumentationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
