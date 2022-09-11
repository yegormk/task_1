import { Component } from '@angular/core';
import { Observable, timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  seconds = 0;
  minutes = 0;
  hours = 0;
  buttonStatus = 'Start';
  isRunning = false;
  waitStatus = false;
  showSeconds = '00';
  showMinutes = '00';
  showHours = '00';
  obsTimer$: Observable<number> = timer(0, 1000);
  subscription!: Subscription;
  timeFirstClick!: number;
  
  
  startStop(status:boolean){
    console.log(status);
    if(status && !this.waitStatus){
      this.isRunning = status;
      this.buttonStatus = 'Stop';
      this.subscription = this.obsTimer$.subscribe(() => {
      this.seconds += 1;
        if(this.seconds <= 9){
          this.showSeconds = "0" + this.seconds;
        }
        if (this.seconds > 9){
          this.showSeconds = this.seconds.toString();
        }
        if (this.seconds === 60) {
          this.minutes++;
          this.showMinutes = "0" + this.minutes;
          this.seconds = 0;
          this.showSeconds = "0" + 0;
        }

        if (this.minutes > 9){
          this.showMinutes = this.minutes.toString();
        }
        if (this.minutes === 60) {

          this.hours++;
          this.showHours = "0" + this.showHours;
          this.minutes = 0;
          this.showMinutes = "0" + 0;
        } 

        if (this.hours > 9){
          this.showHours = this.hours.toString();
        }

        
      });
    } else if (!this.waitStatus) {
      this.isRunning = status;
      this.buttonStatus = 'Start';
      this.showSeconds = '00';
      this.showMinutes = '00';
      this.showHours = '00';
      this.subscription.unsubscribe();
    }
  }

  reset(){
    if(!this.isRunning){
      this.seconds = 0;
      this.minutes = 0;
      this.hours = 0;
      this.showSeconds = '00';
      this.showMinutes = '00';
      this.showHours = '00';
    }
  }

  wait(event: MouseEvent){

    if (event.timeStamp - this.timeFirstClick < 300){
      console.log(Math.round(event.timeStamp - this.timeFirstClick));
      if (this.subscription && this.isRunning){
        if(!this.waitStatus){
          this.subscription.unsubscribe();
          this.waitStatus = !this.waitStatus;
        } else {
          this.waitStatus = !this.waitStatus;
          this.startStop(this.isRunning);
        }

      }
    } else {
      this.timeFirstClick = event.timeStamp;
    }
  }
}
  
