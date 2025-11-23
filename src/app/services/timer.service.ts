import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, interval, map } from 'rxjs';

export type TimerMode = 'down' | 'up';

@Injectable({ providedIn: 'root' })
export class TimerService implements OnDestroy {
  private initial = 20 * 60; // 20:00
  private seconds$ = new BehaviorSubject<number>(this.initial);
  private running$ = new BehaviorSubject<boolean>(false);
  private mode$ = new BehaviorSubject<TimerMode>('down');
  private sub: any;

  readonly displayTime$ = this.seconds$.pipe(
    map(s => {
      const m = Math.max(0, Math.floor(s / 60)).toString().padStart(2, '0');
      const ss = Math.max(0, s % 60).toString().padStart(2, '0');
      return `${m}:${ss}`;
    })
  );

  get snapshotSeconds() {
    return this.seconds$.value;
  }
  get snapshotRunning() {
    return this.running$.value;
  }
  get snapshotMode() {
    return this.mode$.value;
  }

  setMode(mode: TimerMode) {
    this.mode$.next(mode);
    this.reset();
  }

  start() {
    if (this.running$.value) return;
    this.running$.next(true);
    this.sub = interval(1000).subscribe(() => {
      const mode = this.mode$.value;
      const s = this.seconds$.value;
      if (mode === 'down') {
        this.seconds$.next(Math.max(0, s - 1));
        if (this.seconds$.value === 0) this.pause();
      } else {
        this.seconds$.next(s + 1);
      }
    });
  }

  pause() {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
    this.running$.next(false);
  }

  toggle() {
    this.snapshotRunning ? this.pause() : this.start();
  }

  reset() {
    this.pause();
    this.seconds$.next(this.mode$.value === 'down' ? this.initial : 0);
  }

  ngOnDestroy() {
    this.pause();
  }
}
