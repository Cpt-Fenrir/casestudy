import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonicModule, SegmentChangeEventDetail } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addOutline, checkmarkOutline, chevronForwardOutline, timeOutline } from 'ionicons/icons';
import { Subject, takeUntil } from 'rxjs';
import { Task, TaskService } from '../../services/task.service';

type Category = 'Other' | 'Work' | 'Study' | 'Personal' | 'Health';

type TaskItem = Task & {
  dot: string;
  accent: string;
  time: string;
  done: boolean;
};

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit, OnDestroy {
  // Filters
  categories: Category[] = ['Other', 'Work', 'Study', 'Personal', 'Health'];
  selectedCategory: Category = 'Other';

  tasks: TaskItem[] = [];
  private destroy$ = new Subject<void>();

  constructor(private taskService: TaskService, private router: Router) {
    addIcons({ addOutline, timeOutline, checkmarkOutline, chevronForwardOutline });
  }

  ngOnInit(): void {
    this.taskService.tasks$
      .pipe(takeUntil(this.destroy$))
      .subscribe(list => {
        this.tasks = list.map(t => this.mapTask(t));
      });
    this.tasks = this.taskService.getTasks().map(t => this.mapTask(t));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get filteredTasks(): TaskItem[] {
    if (this.selectedCategory === 'Other') {
      return this.tasks;
    }
    return this.tasks.filter(t => t.category === this.selectedCategory);
  }

  onCategoryChange(ev: CustomEvent<SegmentChangeEventDetail>) {
    this.selectedCategory = ev.detail.value as Category;
  }

  toggleDone(t: TaskItem, ev?: Event) {
    ev?.stopPropagation();
    this.taskService.completeTask(t.id);
  }

  addTask() {
    this.router.navigate(['/add-task']);
  }

  openTask(t: TaskItem) {
    this.router.navigate(['/task', t.id]);
  }

  private mapTask(task: Task): TaskItem {
    const allowed: Category[] = ['Other', 'Work', 'Study', 'Personal', 'Health'];
    const category = (allowed.includes(task.category as Category) ? (task.category as Category) : 'Other') as Category;
    const dotByCategory: Record<Category, string> = {
      Other: '#F59E0B',
      Work: '#2563EB',
      Study: '#9333EA',
      Personal: '#10B981',
      Health: '#EF4444',
    };
    return {
      ...task,
      duration: task.duration,
      category,
      done: task.completed,
      dot: dotByCategory[category] ?? '#28C381',
      accent: '#28C381',
      time: task.dueTime ?? '—',
    };
  }
}
