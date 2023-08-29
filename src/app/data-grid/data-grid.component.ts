import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ApiService } from '../api.service';
import { SearchDataType } from '../types';
import { Observable } from 'rxjs';

@Pipe({
  name: 'headers',
  standalone: true
})
export class DataHeadersPipe implements PipeTransform {
  transform(value: SearchDataType, itemsToShow?: number) {
    return value ? Object.keys(value).slice(0, itemsToShow) as Array<keyof SearchDataType> : [];
  }
}

@Component({
  selector: 'aize-data-grid',
  standalone: true,
  imports: [CommonModule, HttpClientModule, DataHeadersPipe],
  providers: [ApiService],
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent {
  protected readonly itemsToShow = 6;
  @Input('data') data$!: Observable<SearchDataType[]>;
}
