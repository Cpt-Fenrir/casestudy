import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { provideRouter } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { PomodoroService } from '../../services/pomodoro.service';
import { of } from 'rxjs';

class TaskServiceMock {
  tasks$ = of([]);
  getTodaysTasks = jasmine.createSpy().and.returnValue([]);
  getCompletedCount = jasmine.createSpy().and.returnValue(0);
}

class PomodoroServiceMock {
  sessions$ = of([]);
  getTodaysFocusTime = jasmine.createSpy().and.returnValue(0);
}

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        provideRouter([]),
        { provide: TaskService, useClass: TaskServiceMock },
        { provide: PomodoroService, useClass: PomodoroServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
