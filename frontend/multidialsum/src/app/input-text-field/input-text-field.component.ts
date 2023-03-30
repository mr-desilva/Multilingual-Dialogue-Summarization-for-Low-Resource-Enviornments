import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-input-text-field',
  templateUrl: './input-text-field.component.html',
  styleUrls: ['./input-text-field.component.css']
})
export class InputTextFieldComponent {
  inputText: string | undefined;

  constructor(private http: HttpClient) { }

  onSubmit() {
    const url = 'http://localhost:5000/api/summarize'; // Replace with your Flask API endpoint

    this.http.post(url, { text: this.inputText }).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
