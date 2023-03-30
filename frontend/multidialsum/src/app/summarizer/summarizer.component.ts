import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-summarizer',
  templateUrl: 'summarizer.component.html',
  styleUrls: ['summarizer.component.css'],
})
export class SummarizerComponent {
  inputText = '';
  summary = '';

  constructor(private http: HttpClient) {}

  onSubmit(): void {
    this.http
      .post('http://localhost:5000/api/summarize', { text: this.inputText })
      .subscribe((response: any) => {
        this.summary = response.summary;
      });
  }
}
