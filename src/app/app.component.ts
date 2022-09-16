import { Component, OnInit } from '@angular/core';
import {
  timer,
  map, 
  Subject, 
  BehaviorSubject, 
  withLatestFrom, 
  switchMap, 
  takeUntil, 
  pairwise, 
  filter,
} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit(): void {
    this.sunscribeStart();
    this.subscribeWait();
  }

  seconds$ = new BehaviorSubject<number>(0);

  start$ = new Subject<boolean>();
  stop$ = new Subject<void>();
  wait$ = new Subject<void>();
  
  start(): void {
    this.start$.next(true);
  }

  stop(): void {
    this.seconds$.next(0);
    this.start$.next(false);
    this.stop$.next();
  }

  reset(): void {
    this.stop();
    this.start();
  }

  wait(): void {
    this.wait$.next()
  }

  sunscribeStart(): void {
    this.start$.pipe(
      withLatestFrom(this.seconds$),
      switchMap(([valueFromStartSubject, currentSeconds]) => {
        return timer(0, 1000).pipe(
          map(timerValue => timerValue + currentSeconds),
          takeUntil(this.stop$),
        );
      }),
    ).subscribe( (time) => {
      this.seconds$.next(time);
    });
  }

  subscribeWait(): void {
    this.wait$.pipe(
      map(() => new Date()),
      pairwise(),
      filter(([date1, date2]) => (date2.getTime() - date1.getTime()) <= 300 ),
    ).subscribe(() => {
      (this.stop$.observed) ? this.stop$.next() : this.start$.next(true);
    });
  }

}
  
