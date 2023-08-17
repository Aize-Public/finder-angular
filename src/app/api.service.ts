import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ApiService {

    private readonly http = inject(HttpClient);

    get<T>(path: string, params?: HttpParams): Observable<T> {
        return this.http.get<T>(`http://localhost:3000/${path}`, { params })
            .pipe(catchError((errors) => throwError(() => new Error(errors.error))));
    }

    post<T>(path: string, body = {}): Observable<T> {
        return this.http.post<T>(
            `http://localhost:3000/${path}`,
            JSON.stringify(body)
        ).pipe(catchError((errors) => throwError(() => new Error(errors.error))));
    }

}