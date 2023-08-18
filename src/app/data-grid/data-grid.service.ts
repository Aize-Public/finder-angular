import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '../api.service';
import { SearchDataType, SearchResponse } from '../types';

@Injectable()
export class DataGridService {
    private readonly api = inject(ApiService);

    getAll(): Observable<Array<SearchDataType>> {
        return this.api.post<SearchResponse>('api/search').pipe(map((response: SearchResponse) => response.results));
    }

}