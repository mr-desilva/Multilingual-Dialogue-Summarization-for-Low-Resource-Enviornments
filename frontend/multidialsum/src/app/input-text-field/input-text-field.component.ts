import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-input-text-field',
  templateUrl: './input-text-field.component.html',
  styleUrls: ['./input-text-field.component.scss']
})
export class InputTextFieldComponent {
  inputText: string | undefined;
  summary!: string;

  constructor(private http: HttpClient) { }

  onSubmit() {
    const url = 'http://localhost:5000/api/summarize'; // summarize endpoint

    this.http.post(url, { text: this.inputText }).subscribe(
      (response: any) => {
        this.summary = response;
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}


// // Use this for mock development
//   onSubmit() {
//     // Mock JSON response object
//     const mockResponse = {
//       summary: 'This is a mock summary of the input text.',
//     };
  
//     // Simulate an API call delay using setTimeout
//     setTimeout(() => {
//       this.summary = mockResponse.summary;
//       console.log(mockResponse);
//     }, 1000); // Adjust the delay (in milliseconds) as needed
//   }