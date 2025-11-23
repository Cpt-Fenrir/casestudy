import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PomodoroFullscreenPage } from './pomodoro-fullscreen.page';

const routes: Routes = [{ path: '', component: PomodoroFullscreenPage }];

@NgModule({
  imports: [PomodoroFullscreenPage, RouterModule.forChild(routes)],
})
export class PomodoroFullscreenPageModule {}
