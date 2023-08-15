import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { SearchDataType } from '../types';

@Injectable()
export class DataGridService {
    private readonly api = inject(ApiService);

    getAll(): Observable<Array<SearchDataType>> {
        return this.api.get('api/search');
    }

}