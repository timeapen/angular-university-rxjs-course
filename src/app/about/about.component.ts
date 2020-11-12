import { ConstantPool } from '@angular/compiler';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { interval, noop, timer, Observable, fromEvent } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { createHttpObservable } from '../common/util'


@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const coursesRequest$ = createHttpObservable('/api/courses');

    const courses$ = coursesRequest$
                      .pipe(
                         map(res => Object.values(res['payload']))
                      );

    courses$.subscribe(
      courses => console.log('Here are your course: ', courses),
      noop,
      () => console.log('completed')
    );  

  }


  private observableExample() {
    const interval$ = interval(1000);

    interval$.subscribe(val => console.log("Hi Santo " + val));

    interval$.subscribe(val => console.log("Hi Sid " + val));

    const timer$ = timer(5000);

    interval$.pipe(takeUntil(timer$))
      .subscribe(val => console.log("Timer: " + val));


  }
}
