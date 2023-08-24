import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { SearchResponse } from './types';

@Injectable()
export class ApiService {

    private readonly http = inject(HttpClient);
    private readonly defaultFilters = {
        aggregate: "System,Discipline",
        stats: "CALIBRATED RANGE MAX",
    }

    get<T>(path: string, params?: HttpParams): Observable<T> {
        return this.http.get<T>(`http://localhost:3000/${path}`, { params })
            .pipe(catchError((errors) => throwError(() => new Error(errors.error))));
    }

    post<T>(path: string, body = {}): Observable<T> {
        return this.http.post<T>(
            `http://localhost:3000/${path}`,
            body
        ).pipe(catchError((errors) => throwError(() => new Error(errors.error))));
    }

    getAll(): Observable<SearchResponse> {
        return this.post<SearchResponse>('api/search', {
            query: '',
            filters: [],
            ...this.defaultFilters
        }).pipe(
            shareReplay(1)
        )
    }

}