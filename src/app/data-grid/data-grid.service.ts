import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ISearchDataModel } from '../../models/search-data.model';
import { ApiService } from '../api.service';

@Injectable()
export class DataGridService {
    private readonly api = inject(ApiService);

    getAll(): Observable<Array<ISearchDataModel>> {
        return this.api.get('api/search');
    }

}