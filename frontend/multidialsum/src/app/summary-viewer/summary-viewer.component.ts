import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-viewer',
  templateUrl: './summary-viewer.component.html',
  styleUrls: ['./summary-viewer.component.scss']
})
export class SummaryViewerComponent {
  @Input()
  summary!: string;
}
