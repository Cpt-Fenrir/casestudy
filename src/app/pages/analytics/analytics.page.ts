import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  calendarOutline,
  checkboxOutline,
  checkmarkDoneOutline,
  happyOutline,
  listOutline,
  timeOutline,
  trendingUpOutline,
} from 'ionicons/icons';
import { Subject, takeUntil } from 'rxjs';
import { PomodoroService } from '../../services/pomodoro.service';
import { Task, TaskService } from '../../services/task.service';
import { MoodEntry, MoodService, MoodValue } from '../../services/mood.service';

type Range = 'week' | 'month' | 'year';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
})
export class AnalyticsPage implements OnInit, OnDestroy {
  range: Range = 'week';
  monthLabel = '';
  private destroy$ = new Subject<void>();

  // Axis ticks shown on charts
  ticks = [90, 60, 25, 0];

  // Labels (week view)
  weekLabels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

  // Data (changes with range)
  focusData: number[] = [];
  tasksData: number[] = [];

  // Derived stats
  focusMinutes = 0;
  tasksCompleted = 0;
  productivity = 0; // %

  // Category % (0..100)
  categories: Array<'Work'|'Study'|'Personal'|'Health'> = ['Work','Study','Personal','Health'];
  categoryColors: Record<string,string> = {
    Work:    '#F46D6D',
    Study:   '#F4C66B',
    Personal:'#B7A6F7',
    Health:  '#78D08F',
  };
  categoryPct: Record<string,number> = { Work: 0, Study: 0, Personal: 0, Health: 0 };

  recentMoods: { mood: MoodValue; date: string }[] = [];
  showMoods = true;

  // Max values for scaling bars
  get focusMax() { return Math.max(...this.focusData, 1); }
  get tasksMax() { return Math.max(...this.tasksData, 1); }

  constructor(
    private pomodoroService: PomodoroService,
    private taskService: TaskService,
    private moodService: MoodService
  ) {
    addIcons({
      calendarOutline,
      timeOutline,
      checkboxOutline,
      checkmarkDoneOutline,
      trendingUpOutline,
      listOutline,
      happyOutline,
    });
  }

  ngOnInit() {
    this.updateMonthLabel();
    this.taskService.tasks$
      .pipe(takeUntil(this.destroy$))
      .subscribe(list => this.recompute(list, this.pomodoroService.getSessions(), this.range));
    this.pomodoroService.sessions$
      .pipe(takeUntil(this.destroy$))
      .subscribe(list => this.recompute(this.taskService.getTasks(), list, this.range));
    this.moodService.entries$
      .pipe(takeUntil(this.destroy$))
      .subscribe(entries => this.updateMoods(entries));
    this.recompute(this.taskService.getTasks(), this.pomodoroService.getSessions(), this.range);
    this.updateMoods(this.moodService.getRecent());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateMonthLabel() {
    const d = new Date();
    const month = d.toLocaleString('default', { month: 'long' });
    this.monthLabel = `${month} ${d.getFullYear()}`;
  }

  setRange(r: Range) {
    this.range = r;
    this.recompute(this.taskService.getTasks(), this.pomodoroService.getSessions(), r);
  }

  logMood(mood: MoodValue) {
    this.moodService.addMood(mood);
  }

  clearMoods() {
    this.moodService.clearAll();
  }

  toggleMoodList() {
    this.showMoods = !this.showMoods;
  }

  private recompute(tasks: Task[], sessions: { date: Date; focusTime: number }[], range: Range) {
    const { labels, focusSeries, taskSeries } = this.buildSeries(range, tasks, sessions);
    this.weekLabels = labels;
    this.focusData = focusSeries;
    this.tasksData = taskSeries;

    // Derived stats for selected range
    this.focusMinutes = focusSeries.reduce((a, b) => a + b, 0);
    this.tasksCompleted = taskSeries.reduce((a, b) => a + b, 0);
    const target = range === 'week' ? 10 : range === 'month' ? 40 : 480;
    this.productivity = Math.round(Math.min(100, (this.tasksCompleted / target) * 100));

    // Category percentages from all tasks
    const totalTasks = tasks.length || 1;
    const counts = this.categories.reduce<Record<string, number>>((acc, c) => {
      acc[c] = tasks.filter(t => (t.category as string) === c).length;
      return acc;
    }, {} as Record<string, number>);
    this.categoryPct = this.categories.reduce<Record<string, number>>((acc, c) => {
      acc[c] = Math.round((counts[c] / totalTasks) * 100);
      return acc;
    }, { Work: 0, Study: 0, Personal: 0, Health: 0 });
  }

  private buildSeries(
    range: Range,
    tasks: Task[],
    sessions: { date: Date; focusTime: number }[]
  ): { labels: string[]; focusSeries: number[]; taskSeries: number[] } {
    const now = new Date();
    if (range === 'week') {
      const labels: string[] = [];
      const focusSeries: number[] = [];
      const taskSeries: number[] = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(now.getDate() - i);
        labels.push(d.toLocaleDateString(undefined, { weekday: 'short' }));
        focusSeries.push(
          sessions
            .filter(s => new Date(s.date).toDateString() === d.toDateString())
            .reduce((sum, s) => sum + (s.focusTime || 0), 0)
        );
        taskSeries.push(tasks.filter(t => new Date(t.createdDate).toDateString() === d.toDateString() && t.completed).length);
      }
      return { labels, focusSeries, taskSeries };
    }

    if (range === 'month') {
      const labels = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'];
      const bucketSize = 4; // days per bucket approx
      const focusSeries = Array(7).fill(0);
      const taskSeries = Array(7).fill(0);
      sessions.forEach(s => {
        const diff = this.daysAgo(now, new Date(s.date));
        if (diff <= 28) {
          const idx = Math.min(6, Math.floor(diff / bucketSize));
          focusSeries[idx] += s.focusTime || 0;
        }
      });
      tasks.forEach(t => {
        const diff = this.daysAgo(now, new Date(t.createdDate));
        if (diff <= 28 && t.completed) {
          const idx = Math.min(6, Math.floor(diff / bucketSize));
          taskSeries[idx] += 1;
        }
      });
      return { labels, focusSeries, taskSeries };
    }

    // year
    const labels: string[] = [];
    const focusSeries: number[] = [];
    const taskSeries: number[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setMonth(now.getMonth() - i);
      labels.push(d.toLocaleString(undefined, { month: 'short' }));
      const month = d.getMonth();
      const year = d.getFullYear();
      focusSeries.push(
        sessions
          .filter(s => {
            const sd = new Date(s.date);
            return sd.getMonth() === month && sd.getFullYear() === year;
          })
          .reduce((sum, s) => sum + (s.focusTime || 0), 0)
      );
      taskSeries.push(
        tasks.filter(t => {
          const td = new Date(t.createdDate);
          return td.getMonth() === month && td.getFullYear() === year && t.completed;
        }).length
      );
    }
    return { labels, focusSeries, taskSeries };
  }

  private daysAgo(now: Date, date: Date): number {
    const diffMs = now.getTime() - date.getTime();
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  }

  private updateMoods(entries: MoodEntry[]) {
    this.recentMoods = this.moodService.getRecent().map(e => ({
      mood: e.mood,
      date: new Date(e.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    }));
  }

  barHeight(value: number, max: number): number {
    return Math.round((value / (max || 1)) * 100);
  }
}
