import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Pipe, PipeTransform, inject } from '@angular/core';
import { ISearchDataModel } from '../../models/search-data.model';
import { ApiService } from '../api.service';
import { DataGridService } from './data-grid.service';

@Pipe({
  name: 'headers',
  standalone: true
})
export class DataHeadersPipe implements PipeTransform {
  transform(value: ISearchDataModel, itemsToShow?: number) {
    return Object.keys(value).slice(0, itemsToShow) as Array<keyof ISearchDataModel>;
  }
}

@Component({
  selector: 'aize-data-grid',
  standalone: true,
  imports: [CommonModule, HttpClientModule, DataHeadersPipe],
  providers: [DataGridService, ApiService],
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent {

  protected readonly data$ = inject(DataGridService).getAll();
  protected readonly itemsToShow = 6;
}
