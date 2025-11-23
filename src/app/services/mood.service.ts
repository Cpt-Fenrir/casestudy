import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type MoodValue = 'Bad' | 'Okay' | 'Good' | 'Great';

export interface MoodEntry {
  id: string;
  mood: MoodValue;
  date: Date;
  note?: string;
}

@Injectable({ providedIn: 'root' })
export class MoodService {
  private readonly storageKey = 'mood_entries';
  private entries = new BehaviorSubject<MoodEntry[]>([]);
  entries$: Observable<MoodEntry[]> = this.entries.asObservable();

  constructor() {
    this.load();
  }

  private load(): void {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return;
    try {
      const parsed: MoodEntry[] = JSON.parse(raw);
      this.entries.next(
        parsed.map(e => ({
          ...e,
          date: e.date ? new Date(e.date) : new Date(),
        }))
      );
    } catch (err) {
      console.error('Error loading moods', err);
    }
  }

  addMood(mood: MoodValue, note?: string): void {
    const entry: MoodEntry = {
      id: Date.now().toString(),
      mood,
      date: new Date(),
      note,
    };
    this.entries.next([...this.entries.value, entry]);
    this.save();
  }

  getRecent(limit = 7): MoodEntry[] {
    return [...this.entries.value]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, limit);
  }

  clearAll(): void {
    this.entries.next([]);
    this.save();
  }

  private save(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.entries.value));
  }
}
