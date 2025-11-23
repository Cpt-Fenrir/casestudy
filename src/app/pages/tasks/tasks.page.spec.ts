import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksPage } from './tasks.page';
import { TaskService } from '../../services/task.service';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

class TaskServiceMock {
  tasks$ = of([]);
}

describe('TasksPage', () => {
  let component: TasksPage;
  let fixture: ComponentFixture<TasksPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksPage],
      providers: [provideRouter([]), { provide: TaskService, useClass: TaskServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
