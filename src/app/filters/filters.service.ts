import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { FilterRequest, FiltersType, SearchResponse } from '../types';

@Injectable()
export class FiltersService {
    private readonly api = inject(ApiService);

    getMeta(): Observable<FiltersType> {
        return this.api.get('api/meta');
    }

    applyFilters(body: FilterRequest): Observable<SearchResponse> {
        return this.api.post('api/search', body)
    }

}