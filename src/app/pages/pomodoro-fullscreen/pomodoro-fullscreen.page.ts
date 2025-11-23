import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  checkmarkOutline,
  closeOutline,
  expandOutline,
  musicalNotesOutline,
  pause,
  play,
  settingsOutline,
  stop,
  timerOutline,
  volumeHighOutline,
  volumeMuteOutline,
} from 'ionicons/icons';
import { Observable } from 'rxjs';
import { TimerMode, TimerService } from '../../services/timer.service';

@Component({
  selector: 'app-pomodoro-fullscreen',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './pomodoro-fullscreen.page.html',
  styleUrls: ['./pomodoro-fullscreen.page.scss'],
})
export class PomodoroFullscreenPage {
  time$: Observable<string> = this.timer.displayTime$;

  muted = false;

  // sheets
  timerModeOpen = false;
  whiteNoiseOpen = false;

  mode: TimerMode = this.timer.snapshotMode;
  noiseOptions = ['None', 'Tic-tac', 'Countdown', 'Wind with crickets', 'Class Room', 'Wilderness'];
  selectedNoise = 'None';

  constructor(private timer: TimerService, private router: Router) {
    addIcons({
      timerOutline,
      expandOutline,
      musicalNotesOutline,
      closeOutline,
      volumeMuteOutline,
      volumeHighOutline,
      settingsOutline,
      play,
      pause,
      stop,
      checkmarkOutline,
    });
  }

  get running(): boolean {
    return this.timer.snapshotRunning;
  }

  toggle() {
    this.timer.toggle();
  }
  stop() {
    this.timer.reset();
  }
  close() {
    this.router.navigateByUrl('/tabs/pomodoro');
  }

  toggleMute() {
    this.muted = !this.muted;
    /* plug into audio later */
  }

  openTimerMode() {
    this.whiteNoiseOpen = false;
    this.timerModeOpen = true;
  }
  applyTimerMode() {
    this.timer.setMode(this.mode);
    this.timerModeOpen = false;
  }

  openWhiteNoise() {
    this.timerModeOpen = false;
    this.whiteNoiseOpen = true;
  }
}
