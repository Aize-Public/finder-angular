import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../api.service';
import { FiltersService } from './filters.service';
import { FilterDataType, FilterPayload, FiltersType, SearchDataType } from '../types';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, map, of, take, tap } from 'rxjs';
import { CalendarComponent, MultiSelectComponent, SliderComponent } from '@aize/ui';
import { Overlay, OverlayModule, ScrollStrategy } from '@angular/cdk/overlay';
import { SelectionModel } from '@angular/cdk/collections';


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
  imports: [CommonModule, OverlayModule, HttpClientModule, ActiveFiltersPipe, MultiSelectComponent, SliderComponent, CalendarComponent],
  providers: [ApiService, FiltersService],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {

  @Output()
  filterApplied = new EventEmitter<Observable<SearchDataType[]>>();

  @Input()
  query = ''

  private readonly overlay = inject(Overlay);
  private readonly filtersService = inject(FiltersService);
  private defaultFilters: Array<keyof FiltersType> = ['System', 'Discipline', 'CALIBRATED RANGE MAX'];
  private appliedFilters = new Map<keyof FiltersType, FilterPayload>();
  private aggregateValue = '';
  private statsValue = '';


  protected availableFilters: Array<keyof FiltersType> = [];
  protected readonly filters$ = this.filtersService.getFilters().pipe(
    tap((filters) => this.availableFilters = Object.keys(filters) as Array<keyof FiltersType>),
    map(filters => Object.entries(filters))
  );
  protected readonly selectionModel = new SelectionModel<keyof FiltersType>(true);
  protected scrollStrategy!: ScrollStrategy;

  isDropdownOpen = false;

  ngOnInit(): void {
    this.scrollStrategy = this.overlay.scrollStrategies.reposition();
    this.selectionModel.select(...this.defaultFilters);
  }

  onSelectionChange(values: Array<string>, label: keyof FiltersType, filter: FilterDataType): void {
    if (!this.appliedFilters.has(label)) {
      this.aggregateValue += !this.aggregateValue ? label : `,${label}`;
      this.appliedFilters.set(label, {
        label: label,
        type: filter.dataType,
        options: filter.values.map((value) => ({ name: value.toString(), value: value.toString() })),
        selection: values.map((value) => ({ name: value.toString(), value: value.toString() }))
      });
    } else {
      const existingFilter = this.appliedFilters.get(label)!;
      existingFilter.selection = values.map((value) => ({ name: value.toString(), value: value.toString() }));
      this.appliedFilters.set(label, existingFilter);
    }
    this.applyFilters();
  }

  onSliderChange(value: number, label: keyof FiltersType, filter: FilterDataType): void {
    if (!this.appliedFilters.has(label)) {
      this.statsValue += !this.statsValue ? label : `,${label}`;
      this.appliedFilters.set(label, {
        label: label,
        type: filter.dataType,
        rangeMin: filter.min,
        rangeMax: filter.max,
        value,
      });
    }
    this.applyFilters();
  }

  onDateChange(date: number, label: keyof FiltersType, filter: FilterDataType) {
    console.log(date);
    if (!this.appliedFilters.has(label)) {
      this.statsValue += !this.statsValue ? label : `,${label}`;
      this.appliedFilters.set(label, {
        label: label,
        type: filter.dataType,
        rangeMin: filter.min,
        rangeMax: filter.max,
        min: date,
        max: date
      });
    }
    this.applyFilters();
  }

  private applyFilters(): void {
    this.filtersService.applyFilters({
      query: this.query,
      aggregate: this.aggregateValue,
      filters: [...this.appliedFilters.values()],
      stats: this.statsValue
    }).pipe(take(1)).subscribe((response) => {
      this.filterApplied.emit(of(response.results));
    });
  }

}
