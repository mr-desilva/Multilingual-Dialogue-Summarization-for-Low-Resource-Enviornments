import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryComponentComponent } from './summary-component.component';

describe('SummaryComponentComponent', () => {
  let component: SummaryComponentComponent;
  let fixture: ComponentFixture<SummaryComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
