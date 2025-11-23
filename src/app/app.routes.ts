import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
  },
  {
    path: 'tasks',
    loadComponent: () => import('./pages/tasks/tasks.page').then(m => m.TasksPage),
  },
  {
    path: 'tabs/tasks',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'add-task',
    loadComponent: () => import('@app/pages/add-task/add-task.page').then(m => m.AddTaskPage),
  },
  {
    path: 'pomodoro',
    loadChildren: () => import('./pages/pomodoro/pomodoro.module').then(m => m.PomodoroPageModule),
  },
  {
    path: 'tabs/pomodoro',
    redirectTo: 'pomodoro',
    pathMatch: 'full',
  },
  {
    path: 'pomodoro/fullscreen',
    loadChildren: () =>
      import('./pages/pomodoro-fullscreen/pomodoro-fullscreen.module').then(m => m.PomodoroFullscreenPageModule),
  },
  {
    path: 'analytics',
    loadComponent: () => import('./pages/analytics/analytics.page').then(m => m.AnalyticsPage),
  },
  {
    path: 'task/:id',
    loadComponent: () => import('./pages/task-detail/task-detail.page').then(m => m.TaskDetailPage),
  },
];
