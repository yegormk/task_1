import { Pipe, PipeTransform } from "@angular/core"



@Pipe({
    name: 'displayTime'
})
export class DisplayPipe implements PipeTransform {
    transform(seconds: number) {
        let showSeconds = '00';
        let showMinutes = '00';
        let showHours = '00';
        let minutes = 0;
        let hours = 0;
        if (seconds <= 9) {
          showSeconds = "0" + seconds;
        }

        if (seconds > 9) {
          showSeconds = seconds.toString();
        }

        if (seconds === 60) {
          minutes++;
          showMinutes = "0" + minutes;
          seconds = 0;
          showSeconds = "0" + 0;
        }

        if (minutes > 9) {
          showMinutes = minutes.toString();
        }

        if (minutes === 60) {
          hours++;
          showHours = "0" + showHours;
          minutes = 0;
          showMinutes = "0" + 0;
        } 

        if (hours > 9) {
          showHours = hours.toString();
        }

        return `${showHours}:${showMinutes}:${showSeconds}`;
    }
}