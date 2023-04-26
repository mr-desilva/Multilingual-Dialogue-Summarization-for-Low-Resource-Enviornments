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
  
  selectedOption: string | undefined;

  constructor(private http: HttpClient, private db: AngularFireDatabase) {}

  ngOnInit(): void {}
  //const customerMessage1 = "Hi, I'm having trouble logging into my account. Can you help me? Support Agent: Of course, I'd be happy to help. Can you tell me your username and the email address associated with your account? Customer: My username is johnsmith42 and the email is johnsmith42@yahoo.com Support Agent: Thanks, let me take a look at your account. It looks like there's been some suspicious activity on your account, so we've temporarily disabled it for security reasons. Customer: Oh no, what kind of activity? Support Agent: It looks like someone tried to log into your account from a different country, which triggered our security system. But don't worry, we can help you reactivate your account. Can you verify some information for me, such as your full name and date of birth? Customer: Sure, my name is John Smith and my date of birth is April 5th, 1990 Support Agent: Great, thanks for verifying that information. I'm going to send a verification code to your email address. Once you receive it, please enter it on the login screen to reactivate your account. Customer: Okay, I'll keep an eye out for the email. Thank you for your help! Support Agent: You're welcome. Let me know if you have any other questions or concerns";


  onOptionSelected() {
    if (this.selectedOption === 'option1') {
      this.dialogue = "Customer: Hi, I'm having trouble logging into my account. Can you help me?\n\nSupport Agent: Of course, I'd be happy to help. Can you tell me your username and the email address associated with your account?\n\nCustomer: My username is johnsmith42 and the email is johnsmith42@yahoo.com\nSupport Agent: Thanks, let me take a look at your account. It looks like there's been some suspicious activity on your account, so we've temporarily disabled it for security reasons.\n\nCustomer: Oh no, what kind of activity?\n\nSupport Agent: It looks like someone tried to log into your account from a different country, which triggered our security system. But don't worry, we can help you reactivate your account. Can you verify some information for me, such as your full name and date of birth?\n\nCustomer: Sure, my name is John Smith and my date of birth is April 5th, 1990\n\nSupport Agent: Great, thanks for verifying that information. I'm going to send a verification code to your email address. Once you receive it, please enter it on the login screen to reactivate your account.\n\nCustomer: Okay, I'll keep an eye out for the email. Thank you for your help!\n\nSupport Agent: You're welcome. Let me know if you have any other questions or concerns";
    } else if (this.selectedOption === 'option2') {
      this.dialogue = "Customer: Hey, I need to check why my phone is loosing signal ?\n\nSupport: Hello, can I know the phone modal?\n\nCustomer: Yes, this is a iphone 14?\n\nSupport: Did you check for any software updates ? if not please update your device to latest version. \n\nCustomer: Yes, there is a software update, I'll try and let you know.\n\nSupport: Sure\n\nCustomer: I have updates the software to the latest version and now the signal loosing issue is resolved. \n\nSupport: Happy to help.";
    } else if (this.selectedOption === 'option3') {
      this.dialogue = "customer: My watchlist is not updating with new episodes (past couple days).  Any idea why?\n\nsupport: Apologies for the trouble, Norlene! We're looking into this. In the meantime, try navigating to the season / episode manually.\n\ncustomer: Tried logging out/back in, that didn’t help\n\nsupport: Sorry! 😔 We assure you that our team is working hard to investigate, and we hope to have a fix ready soon!\n\ncustomer: Thank you! Some shows updated overnight\n\nsupport: Awesome! That's what we love to hear. If you happen to need anything else, we'll be here to support! 💚";
    }
  }

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
    // this.db.list(language.toLowerCase() + '_summaries').push({ dialogue, summary});  # think of way to load without the lang code
    this.db.list('summaries').push({ dialogue, summary});

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

    // Mock JSON response object
    const mockResponse1 = {
      summary: 'Customer is complaining that they are unable to login into their Yahoo account. Agent states that they had some suspicious activity on their account, so they have temporarily disabled it for security reasons.', lang: 'en'
    };

    const mockResponse2 = {
      summary: 'Customer is complaining about the phone which is losing signal. Agent updated the customer to update the device to latest version.', lang: 'en'
    };

    const mockResponse3 = {
      summary: 'Customer is complaining that their watchlist is not updating with new episodes. Agent updates that their team is working hard to investigate and they hope to have a fix ready soon.', lang: 'en'
    };
  
    // Simulate an API call delay using setTimeout
    setTimeout(() => {
      if(this.selectedOption == "option1") {
        this.summary = mockResponse1.summary;
      }
      else if(this.selectedOption == "option2") {
        this.summary = mockResponse2.summary;
      }
      else if(this.selectedOption == "option3") {
        this.summary = mockResponse3.summary;
      }
      else {
        this.summary = mockResponse.summary;
      }
      this.language = this.getLanguageName(mockResponse.lang);
      this.loading = false;
      this.summaryGenerated = true;
    }, 1000); // Adjust the delay (in milliseconds) as needed
  }
}