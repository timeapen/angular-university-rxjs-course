import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {Observable} from 'rxjs';
import {map, shareReplay, tap} from 'rxjs/operators';
import { createHttpObservable } from '../common/util';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    ngOnInit() {

        const coursesRequest$ = createHttpObservable('/api/courses');

        const courses$: Observable<Course[]> = coursesRequest$
                          .pipe(
                             tap( () => console.log("HTTP Request executed")), 
                             map(res => Object.values(res['payload']) as Course[] ),
                             shareReplay()
                          );

        this.beginnerCourses$ = courses$.pipe(
            map(courses => courses.filter(course => course.category == 'BEGINNER'))
        );
 
        this.advancedCourses$ = courses$.pipe(
            map(courses => courses.filter(course => course.category == 'ADVANCED'))
        );

    }

}
