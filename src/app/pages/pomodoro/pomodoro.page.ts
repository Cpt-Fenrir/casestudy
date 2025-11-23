import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { checkmarkOutline, expandOutline, musicalNotesOutline, timerOutline } from 'ionicons/icons';
import { Observable } from 'rxjs';
import { TimerMode, TimerService } from '../../services/timer.service';

@Component({
  selector: 'app-pomodoro',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  templateUrl: './pomodoro.page.html',
  styleUrls: ['./pomodoro.page.scss'],
})
export class PomodoroPage {
  time$: Observable<string> = this.timer.displayTime$;

  // Sheets
  timerModeOpen = false;
  whiteNoiseOpen = false;

  // Selections
  mode: TimerMode = this.timer.snapshotMode;
  noiseOptions = ['None', 'Tic-tac', 'Countdown', 'Wind with crickets', 'Class Room', 'Wilderness'];
  selectedNoise = 'None';

  constructor(private timer: TimerService, private router: Router) {
    addIcons({ timerOutline, expandOutline, musicalNotesOutline, checkmarkOutline });
  }

  get running(): boolean {
    return this.timer.snapshotRunning;
  }

  toggle() {
    this.timer.toggle();
  }
  openTimerMode() {
    this.whiteNoiseOpen = false;
    this.timerModeOpen = true;
  }
  confirmTimerMode() {
    this.timer.setMode(this.mode);
    this.timerModeOpen = false;
  }

  openWhiteNoise() {
    this.timerModeOpen = false;
    this.whiteNoiseOpen = true;
  }
  confirmWhiteNoise() {
    this.whiteNoiseOpen = false;
    /* hook up audio later */
  }

  goFullscreen() {
    this.router.navigateByUrl('/pomodoro/fullscreen');
  }
}
