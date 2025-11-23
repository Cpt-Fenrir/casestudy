import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface PomodoroSession {
  id: string;
  duration: number;
  completed: boolean;
  date: Date;
  focusTime: number;
}

@Injectable({
  providedIn: 'root'
})
export class PomodoroService {
  private readonly storageKey = 'pomodoro_sessions';
  private readonly defaultDurationMinutes = 25;
  private sessions = new BehaviorSubject<PomodoroSession[]>([]);
  public sessions$ = this.sessions.asObservable();

  private totalFocusMinutes = new BehaviorSubject<number>(0);
  public totalFocusMinutes$ = this.totalFocusMinutes.asObservable();

  constructor() {
    this.loadSessions();
  }

  private loadSessions() {
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) {
      return;
    }

    try {
      const parsed: PomodoroSession[] = JSON.parse(stored);
      this.sessions.next(this.normalizeSessions(parsed));
      this.calculateTotalFocus();
    } catch (error) {
      console.error('Error loading pomodoro sessions', error);
    }
  }

  addSession(focusTime: number, durationMinutes: number = this.defaultDurationMinutes): void {
    const roundedFocus = Math.max(0, Math.round(focusTime));
    const sessionDuration = durationMinutes > 0 ? Math.round(durationMinutes) : this.defaultDurationMinutes;

    const session: PomodoroSession = {
      id: Date.now().toString(),
      duration: sessionDuration,
      completed: true,
      focusTime: roundedFocus,
      date: new Date()
    };
    const current = this.sessions.value;
    this.sessions.next([...current, session]);
    this.calculateTotalFocus();
    this.saveSessions();
  }

  getTodaysFocusTime(): number {
    const today = new Date().toDateString();
    return this.sessions.value
      .filter(s => new Date(s.date).toDateString() === today)
      .reduce((sum, s) => sum + s.focusTime, 0);
  }

  getSessions(): PomodoroSession[] {
    return this.sessions.value;
  }

  private calculateTotalFocus() {
    const total = this.sessions.value.reduce((sum, s) => sum + s.focusTime, 0);
    this.totalFocusMinutes.next(total);
  }

  private saveSessions() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.sessions.value));
  }

  private normalizeSessions(sessions: PomodoroSession[]): PomodoroSession[] {
    return sessions.map(session => ({
      ...session,
      date: session.date ? new Date(session.date) : new Date(),
      duration: session.duration ?? this.defaultDurationMinutes,
      focusTime: session.focusTime ?? 0,
      completed: session.completed ?? true,
    }));
  }
}
