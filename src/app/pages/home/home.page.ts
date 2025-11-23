import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
} from '@ionic/angular/standalone';
import { RouterModule, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  home,
  checkmark,
  timer,
  barChart,
  person,
  timeOutline,
  checkmarkCircleOutline,
  statsChartOutline,
  appsOutline,
  chevronForwardOutline,
} from 'ionicons/icons';
import { TaskService, Task } from '../../services/task.service';
import { PomodoroService } from '../../services/pomodoro.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, RouterModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  focusMinutes = 0;
  tasksCompleted = 0;
  todaysTasks: Task[] = [];
  totalTasks = 0;
  now = new Date();
  private clockIntervalId?: ReturnType<typeof setInterval>;
  private destroy$ = new Subject<void>();

  feelings = [
    { label: 'Bad', value: 'bad' },
    { label: 'Okay', value: 'okay' },
    { label: 'Good', value: 'good' },
    { label: 'Great', value: 'great' },
  ];
  selectedFeeling = 'good';

  constructor(
    private router: Router,
    private taskService: TaskService,
    private pomodoroService: PomodoroService
  ) {
    addIcons({
      home,
      checkmark,
      timer,
      barChart,
      person,
      timeOutline,
      checkmarkCircleOutline,
      statsChartOutline,
      appsOutline,
      chevronForwardOutline,
    });
  }

  ngOnInit() {
    this.loadData();
    // Update date every minute
    this.clockIntervalId = setInterval(() => {
      this.now = new Date();
    }, 60000);
  }

  ngOnDestroy() {
    if (this.clockIntervalId) {
      clearInterval(this.clockIntervalId);
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData() {
    this.taskService.tasks$
      .pipe(takeUntil(this.destroy$))
      .subscribe(tasks => {
        this.todaysTasks = this.taskService.getTodaysTasks();
        this.tasksCompleted = this.taskService.getCompletedCount();
        this.totalTasks = tasks.length;
      });

    this.pomodoroService.sessions$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.focusMinutes = this.pomodoroService.getTodaysFocusTime();
      });

    this.focusMinutes = this.pomodoroService.getTodaysFocusTime();
  }

  startPomodoro() {
    this.router.navigate(['/pomodoro']);
  }

  addTask() {
    this.router.navigate(['/add-task']);
  }

  completeTask(id: string) {
    this.taskService.completeTask(id);
  }

  selectFeeling(value: string) {
    this.selectedFeeling = value;
  }

  goToTasks() {
    this.router.navigate(['/tasks']);
  }

  viewAnalytics() {
    this.router.navigate(['/analytics']);
  }

  openTask(task: Task) {
    this.router.navigate(['/task', task.id]);
  }

  getFocusProgress(): number {
    return this.calculateProgress(this.focusMinutes, 120);
  }

  getTaskProgress(): number {
    return this.calculateProgress(this.tasksCompleted, this.totalTasks);
  }

  getProductivity(): number {
    if (!this.totalTasks) {
      return 0;
    }
    const score = (this.tasksCompleted / this.totalTasks) * 100;
    return Math.min(Math.max(Math.round(score), 0), 100);
  }

  private calculateProgress(value: number, total: number): number {
    if (!total) {
      return 0;
    }
    const progress = (value / total) * 100;
    return Math.min(Math.max(progress, 0), 100);
  }
}
