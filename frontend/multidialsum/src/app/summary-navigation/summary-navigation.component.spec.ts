import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryNavigationComponent } from './summary-navigation.component';

describe('SummaryNavigationComponent', () => {
  let component: SummaryNavigationComponent;
  let fixture: ComponentFixture<SummaryNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
