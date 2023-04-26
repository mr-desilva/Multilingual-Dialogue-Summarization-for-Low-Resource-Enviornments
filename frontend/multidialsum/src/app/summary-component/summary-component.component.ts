import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import ISO6391 from 'iso-639-1';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-summary-component',
  templateUrl: './summary-component.component.html',
  styleUrls: ['./summary-component.component.css']
})
export class SummaryComponentComponent implements OnInit {
  dialogue: string = '';
  language: string = '';
  summary: string = '';
  loading: boolean = false;
  summaryGenerated: boolean = false;

  selectedOption: string | undefined;

  constructor(private http: HttpClient, private db: AngularFireDatabase) {}

  ngOnInit(): void {}


  onOptionSelected() {
    if (this.selectedOption === 'option1') {
      this.dialogue = "客户：您好，我的账户有问题。你能帮助我吗\n\n支持:当然！您能否向我提供有关您遇到的问题的更多信息\n\n客户:我好像无法登录我的帐户。我已经尝试重置我的密码，但我仍然无法进入\n\n支持:能否请您提供您注册的电子邮件地址\n\n客户:是的，是 john.doe@example.com\n\n支持:我将向您的电子邮件地址发送一个密码重置链接。请检查您的收件箱并按照电子邮件中的说明进行操作\n\n客户:好的，我现在看到邮件了。我正在重置我的密码\n\n支持:太好了！请创建一个新的安全密码, 然后再次尝试登录\n\n客户: 成功了！感谢您的帮助\n\n支持: 不客气"
      ;
    } else if (this.selectedOption === 'option2') {
      this.dialogue = "Kunde: Hallo, ich habe ein Problem mit meinem Konto. Kannst du mir helfen?\n\nUnterstützung: Natürlich! Können Sie mir bitte weitere Informationen zu dem Problem geben, das Sie haben?\n\nKunde: Ich kann mich anscheinend nicht bei meinem Konto anmelden. Ich habe versucht, mein Passwort zurückzusetzen, aber ich kann mich immer noch nicht anmelden.\n\nSupport: Können Sie mir bitte Ihre registrierte E-Mail-Adresse mitteilen?\n\nKunde: Ja, es ist john.doe@example.com.\n\nSupport: Ich werde Ihnen einen Link zum Zurücksetzen des Passworts an Ihre E-Mail-Adresse senden. Bitte überprüfen Sie Ihren Posteingang und folgen Sie den Anweisungen in der E-Mail.\n\nKunde: Okay, ich sehe die E-Mail jetzt. Ich setze mein Passwort zurück.\n\nUnterstützung: Super! Bitte erstellen Sie ein neues, sicheres Passwort und versuchen Sie dann erneut, sich anzumelden.\n\nKunde: Es hat funktioniert! Vielen Dank für Ihre Hilfe!";
    } else if (this.selectedOption === 'option3') {
      this.dialogue = "Cliente: Hola, tengo algunos problemas con mi cuenta. ¿Me puedes ayudar?\n\nSoporte: ¡Por supuesto! ¿Puede por favor proporcionarme más información sobre el problema que está experimentando?\n\nCliente: Parece que no puedo iniciar sesión en mi cuenta. He intentado restablecer mi contraseña, pero sigo sin poder entrar.\n\nSoporte: ¿Puede proporcionarme su dirección de correo electrónico registrada?\n\nCliente: Sí, es john.doe@example.com.\n\nSoporte: Voy a enviarle un enlace de restablecimiento de contraseña a su dirección de correo electrónico. Por favor revise su bandeja de entrada y siga las instrucciones en el correo electrónico.\n\nCliente: Bien, ahora veo el correo electrónico. Estoy restableciendo mi contraseña.\n\nSoporte: ¡Genial! Cree una nueva contraseña segura y luego intente iniciar sesión nuevamente.\n\nCliente: ¡Funcionó! ¡Gracias por su ayuda!\n\nSoporte: De na";
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
      text: 'Language of the input dialogue is automatically detected by the modal',
    });
  }

  getLanguageName(langCode: string): string {
    return ISO6391.getName(langCode) || 'Unknown';
  }

  saveSummary(dialogue: string, summary: string, language: string) {
    // this.db.list(language.toLowerCase() + '_summaries').push({ dialogue, summary});
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
  //   const apiUrl = 'http://localhost:5000/api/summarize/multi';

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
      summary: '客户抱怨他们无法登录他们的帐户代理更新他们将向他们的电子邮件地址发送密码重置链接。', lang: 'zh'
    };

    const mockResponse2 = {
      summary: 'Der Kunde klagt, dass er nicht in der Lage ist, sich in sein Konto anzumelden. Agent sagt, dass er ihnen einen Link senden wird, um das Passwort auf ihre E-Mail-Adresse wiederherzustellen.', lang: 'de'
    };

    const mockResponse3 = {
      summary: 'El cliente se queja de que no puede entrar en su cuenta. el agente le propone revisar su cuadro de entrada y seguir las instrucciones en el correo electrónico.', lang: 'es'
    };
  
    // Simulate an API call delay using setTimeout
    setTimeout(() => {
      if(this.selectedOption == "option1") {
        this.summary = mockResponse1.summary;
        this.language = this.getLanguageName(mockResponse1.lang);
      }
      else if(this.selectedOption == "option2") {
        this.summary = mockResponse2.summary;
        this.language = this.getLanguageName(mockResponse2.lang);
      }
      else if(this.selectedOption == "option3") {
        this.summary = mockResponse3.summary;
        this.language = this.getLanguageName(mockResponse3.lang);
      }
      else {
        this.summary = mockResponse.summary;
        this.language = this.getLanguageName(mockResponse.lang);
      }
      this.loading = false;
      this.summaryGenerated = true;
    }, 1000); // Adjust the delay (in milliseconds) as needed
  }

  
}
