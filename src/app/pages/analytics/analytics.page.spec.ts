import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyticsPage } from './analytics.page';
import { provideRouter } from '@angular/router';

describe('AnalyticsPage', () => {
  let component: AnalyticsPage;
  let fixture: ComponentFixture<AnalyticsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
