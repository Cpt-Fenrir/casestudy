import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Task {
  id: string;
  title: string;
  category: 'Work' | 'Study' | 'Personal' | 'Health' | 'Other';
  duration: number;
  completed: boolean;
  dueTime?: string;
  createdDate: Date;
  description?: string;
  priority?: 'High' | 'Medium' | 'Low';
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly storageKey = 'tasks';
  private tasks = new BehaviorSubject<Task[]>([
    {
      id: '1',
      title: 'Complete Project Proposal',
      category: 'Work',
      duration: 20,
      completed: false,
      dueTime: '06:00 PM',
      createdDate: new Date()
    },
    {
      id: '2',
      title: 'Study for exam',
      category: 'Study',
      duration: 30,
      completed: false,
      dueTime: '08:30 AM',
      createdDate: new Date()
    }
  ]);

  public tasks$: Observable<Task[]> = this.tasks.asObservable();

  constructor() {
    this.loadTasks();
  }

  private loadTasks(): void {
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) {
      return;
    }

    try {
      const parsed: Task[] = JSON.parse(stored);
      this.tasks.next(this.normalizeTasks(parsed));
    } catch (error) {
      console.error('Error loading tasks', error);
    }
  }

  addTask(task: Task): void {
    const current = this.tasks.value;
    this.tasks.next([...current, task]);
    this.saveTasks();
  }

  completeTask(id: string): void {
    const updated = this.tasks.value.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    this.tasks.next(updated);
    this.saveTasks();
  }

  updateTask(id: string, payload: Partial<Task>): void {
    const updated = this.tasks.value.map(t =>
      t.id === id ? { ...t, ...payload } : t
    );
    this.tasks.next(updated);
    this.saveTasks();
  }

  deleteTask(id: string): void {
    const updated = this.tasks.value.filter(t => t.id !== id);
    this.tasks.next(updated);
    this.saveTasks();
  }

  getTasks(): Task[] {
    return this.tasks.value;
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.value.find(t => t.id === id);
  }

  getCompletedCount(): number {
    return this.tasks.value.filter(t => t.completed).length;
  }

  getTodaysTasks(): Task[] {
    return this.tasks.value.filter(t => {
      const today = new Date().toDateString();
      return new Date(t.createdDate).toDateString() === today;
    });
  }

  private saveTasks(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks.value));
  }

  private normalizeTasks(tasks: Task[]): Task[] {
    return tasks.map(task => ({
      ...task,
      createdDate: task.createdDate ? new Date(task.createdDate) : new Date(),
    }));
  }
}
