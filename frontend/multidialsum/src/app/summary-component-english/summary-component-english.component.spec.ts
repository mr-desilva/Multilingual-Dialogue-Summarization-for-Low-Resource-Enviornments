import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryComponentEnglishComponent } from './summary-component-english.component';

describe('SummaryComponentEnglishComponent', () => {
  let component: SummaryComponentEnglishComponent;
  let fixture: ComponentFixture<SummaryComponentEnglishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryComponentEnglishComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryComponentEnglishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
