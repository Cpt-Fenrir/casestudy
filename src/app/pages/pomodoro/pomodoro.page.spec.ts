import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PomodoroPage } from './pomodoro.page';
import { PomodoroPageModule } from './pomodoro.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('PomodoroPage', () => {
  let component: PomodoroPage;
  let fixture: ComponentFixture<PomodoroPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PomodoroPageModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PomodoroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
