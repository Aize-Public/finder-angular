import { CalendarComponent, MultiSelectComponent, SliderComponent } from '@aize/ui';
import { SelectionModel } from '@angular/cdk/collections';
import { Overlay, OverlayModule, ScrollStrategy } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Observable, firstValueFrom, map, of, take } from 'rxjs';
import { ApiService } from '../api.service';
import { FilterDataType, FilterPayload, Filters, FiltersType, SearchDataType } from '../types';
import { ActiveFiltersPipe, AvailableFiltersPipe, UpdateFiltersPipe } from './filters.pipe';
import { FiltersService } from './filters.service';

@Component({
  selector: 'aize-filters',
  standalone: true,
  imports: [CommonModule, OverlayModule, HttpClientModule, ActiveFiltersPipe, UpdateFiltersPipe, MultiSelectComponent, SliderComponent, CalendarComponent, AvailableFiltersPipe],
  providers: [ApiService, FiltersService],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {

  private readonly overlay = inject(Overlay);
  private readonly filtersService = inject(FiltersService);
  private appliedFilters = new Map<keyof FiltersType, FilterPayload>();
  private aggregateValue = '';
  private statsValue = '';

  @Output()
  filterApplied = new EventEmitter<Observable<SearchDataType[]>>();

  @Input()
  query = '';

  @Input({
    transform: async (value$: Observable<Filters>) => await firstValueFrom(value$)
  })
  filters!: Filters;

  @Input({
    alias: 'meta',
    transform: (value$: Observable<FiltersType>) => value$.pipe(map(filters => Object.entries(filters)))
  })
  meta$!: Observable<[string, FilterDataType][]>;

  protected readonly selectionModel = new SelectionModel<string>(true);
  protected scrollStrategy!: ScrollStrategy;
  protected isDropdownOpen = false;

  async ngOnInit(): Promise<void> {
    this.scrollStrategy = this.overlay.scrollStrategies.reposition();
    await this.selectDefaultFilters();
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

  private async selectDefaultFilters(): Promise<void> {
    const filters = await this.filters;
    for (const filterLabel in filters.aggregations) {
      this.selectionModel.select(filterLabel);
    }
    for (const filterLabel in filters.stats) {
      this.selectionModel.select(filterLabel);
    }
  }

}
