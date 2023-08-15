import { Injectable, inject } from '@angular/core';
import { ApiService } from '../api.service';
import { FiltersType } from '../types';
import { Observable } from 'rxjs';

@Injectable()
export class FiltersService {
    private readonly api = inject(ApiService);

    getFilters(): Observable<FiltersType> {
        return this.api.get('api/meta');
    }

}