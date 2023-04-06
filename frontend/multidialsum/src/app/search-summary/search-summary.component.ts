import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-search-summary',
  templateUrl: './search-summary.component.html',
  styleUrls: ['./search-summary.component.css']
})
export class SearchSummaryComponent implements OnInit {
  summaries$: Observable<any[]>;
  filteredSummaries: any[] = [];
  searchText: string = '';


  constructor(private db: AngularFireDatabase) {
    this.summaries$ = this.db.list('summaries').valueChanges();
  }

  ngOnInit(): void {
    this.summaries$.subscribe((summaries) => {
      this.filteredSummaries = summaries;
    });
  }

  onSearch() {
    this.summaries$.subscribe((summaries) => {
      this.filteredSummaries = this.filterSummaries(summaries, this.searchText);
    });
  }

  private filterSummaries(summaries: any[], searchText: string): any[] {
    if (!summaries) {
      return [];
    }

    if (!searchText) {
      return summaries;
    }

    return summaries.filter(summary =>
      (summary.dialogue.toLowerCase().includes(searchText.toLowerCase()) ||
       summary.summary.toLowerCase().includes(searchText.toLowerCase()))
    );
  }

}
