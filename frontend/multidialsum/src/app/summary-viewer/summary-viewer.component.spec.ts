import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryViewerComponent } from './summary-viewer.component';

describe('SummaryViewerComponent', () => {
  let component: SummaryViewerComponent;
  let fixture: ComponentFixture<SummaryViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
