// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../helpers/api.service';

// RxJS
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Employee } from './employee.model';

@Injectable()
export class EmployeesService {
    constructor(private http: HttpClient) { }


    // in case we have backEnd and restful apis
    getEmployees(): Observable<Employee[]> {
        const href = `${API.employees}`;
        return this
            .http
            .get(`${href}`)
            .pipe(map((res: any) => res));
    }

}
