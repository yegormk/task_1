import { Component } from '@angular/core';
import { Observable, timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showSeconds = 0;
  seconds = 0;
  buttonTitle = 'Start';
  isRunning = false;
  isDisabledStartStop = false;
  isDisabledReset = true;
  isDisabledWait = true;
  isWaiting = false;

  Timer$: Observable<number> = timer(0, 1000);
  subscription!: Subscription;
  timeFirstClick!: number;
  
  
  startStop(status:boolean) {
    if (status) {
      this.isDisabledWait = false;
      this.isDisabledReset = true;
      this.isRunning = status;
      this.buttonTitle = 'Stop';
      this.subscription = this.Timer$.subscribe(() => {
        this.seconds += 1;
        this.showSeconds = this.seconds;
      });
    } else if (!this.isWaiting) {
      this.isDisabledWait = true;
      this.isDisabledReset = false;
      this.isRunning = status; 
      this.buttonTitle = 'Start'; 
      this.showSeconds = 0;
      this.subscription.unsubscribe();
    }
  }

  reset() {
    if (this.isRunning) {
      return
    }

    this.seconds = 0;
    this.showSeconds = this.seconds;
  }

  wait(event: MouseEvent) {
    if (event.timeStamp - this.timeFirstClick < 300) {
      if (this.subscription && this.isRunning) {
        if (!this.isWaiting) {
          this.isDisabledReset = true;
          this.isDisabledStartStop = true;
          this.subscription.unsubscribe();
          this.isWaiting = !this.isWaiting;
        } else {
          this.isDisabledReset = false;
          this.isDisabledStartStop = false;
          this.isWaiting = !this.isWaiting;
          this.startStop(this.isRunning);
        }

      }
    } else {
      this.timeFirstClick = event.timeStamp;
    }
  }
}
  
