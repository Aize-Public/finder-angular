import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../api.service';
import { FiltersService } from './filters.service';
import { FiltersType } from '../types';
import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs';
import { MultiSelectComponent } from '@aize/ui';


@Pipe({
  name: 'activeFilters',
  standalone: true
})
export class ActiveFiltersPipe implements PipeTransform {
  transform(value: [string, {
    dataType: string;
    values: (string | number)[];
    min?: number | undefined;
    max?: number | undefined;
  }][], arg: Array<keyof FiltersType>) {
    return value.filter(filter => arg.includes(filter[0] as keyof FiltersType))
  }
}

@Component({
  selector: 'aize-filters',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ActiveFiltersPipe, MultiSelectComponent],
  providers: [ApiService, FiltersService],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  protected readonly filters$ = inject(FiltersService).getFilters().pipe(
    map(filters => Object.entries(filters))
  );

  protected defaultFilters: Array<keyof FiltersType> = ['System', 'Discipline', 'FIRE AREA'];

  onSelectionChange(values: Array<string>): void {
    console.table(values)
  }

}
