import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Task, TaskService } from '../../services/task.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonButtons, IonTitle, IonButton, RouterModule],
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
})
export class TaskDetailPage implements OnInit, OnDestroy {
  task?: Task;
  private destroy$ = new Subject<void>();
  now = new Date();

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const id = params.get('id');
      if (!id) {
        this.router.navigate(['/tasks']);
        return;
      }
      const found = this.taskService.getTaskById(id);
      if (!found) {
        this.router.navigate(['/tasks']);
        return;
      }
      this.task = found;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleComplete() {
    if (!this.task) return;
    this.taskService.completeTask(this.task.id);
    const refreshed = this.taskService.getTaskById(this.task.id);
    this.task = refreshed ?? this.task;
  }

  deleteTask() {
    if (!this.task) return;
    this.taskService.deleteTask(this.task.id);
    this.router.navigate(['/tasks']);
  }

  startPomodoro() {
    this.router.navigate(['/pomodoro']);
  }

  editTask() {
    if (!this.task) return;
    this.router.navigate(['/add-task'], { state: { task: this.task } });
  }

  goBack() {
    this.router.navigate(['/tasks']);
  }
}
