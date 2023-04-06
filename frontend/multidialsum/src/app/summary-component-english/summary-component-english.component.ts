import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import ISO6391 from 'iso-639-1';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-summary-component-english',
  templateUrl: './summary-component-english.component.html',
  styleUrls: ['./summary-component-english.component.css']
})

export class SummaryComponentEnglishComponent implements OnInit {
  dialogue: string = '';
  language: string = '';
  summary: string = '';
  loading: boolean = false;
  summaryGenerated: boolean = false;

  constructor(private http: HttpClient, private db: AngularFireDatabase) {}

  ngOnInit(): void {}

  onInputChange() {
    if (this.dialogue === '') {
      this.resetContainers();
    }
  }

  resetContainers() {
    this.language = '';
    this.summary = '';
    this.summaryGenerated = false;
  }

  showInfo() {
    Swal.fire({
      icon: 'info',
      title: 'Info',
      text: 'Modal will generate summaries for english dialogues',
    });
  }

  getLanguageName(langCode: string): string {
    return ISO6391.getName(langCode) || 'Unknown';
  }

  saveSummary(dialogue: string, summary: string, language: string) {
    this.db.list(language.toLowerCase() + '_summaries').push({ dialogue, summary});

    Swal.fire({
        icon: 'success',
        title: 'Saved',
        text: 'Summary Saved to the Database',
      });
    
  }

  // generateSummary() {
  //   if (this.dialogue.trim() === '') {
  //     Swal.fire({
  //       icon: 'warning',
  //       title: 'Alert',
  //       text: 'Please enter the dialogue before generating a summary.',
  //     });
  //     return;
  //   }
  //   this.loading = true;
  //   const apiUrl = 'http://localhost:5000/api/summarize';

  //   // Send the input to the Flask backend
  //   this.http.post(apiUrl, { text: this.dialogue }).subscribe(
  //     (response: any) => {
  //       // Update the summary with the response from the Flask backend
  //       this.summary = response.summary;
  //       this.language = this.getLanguageName(response.lang);
  //       this.loading = false;
  //       this.summaryGenerated = true;
  //     },
  //     (error) => {
  //       console.error('Error fetching summary:', error);
  //       this.loading = false;
  //     }
  //   );
  // }
  // Use this for mock development
  generateSummary() {

    if (this.dialogue.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Alert',
        text: 'Please enter the dialogue before generating a summary.',
      });
      return;
    }
    this.loading = true;

    // Mock JSON response object
    const mockResponse = {
      summary: 'This is a mock summary of the english input text.', lang: 'en'
    };
  
    // Simulate an API call delay using setTimeout
    setTimeout(() => {
      this.summary = mockResponse.summary;
      this.language = this.getLanguageName(mockResponse.lang);
      this.loading = false;
      this.summaryGenerated = true;
    }, 3000); // Adjust the delay (in milliseconds) as needed
  }
}