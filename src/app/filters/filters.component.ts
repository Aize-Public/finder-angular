import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../api.service';
import { FiltersService } from './filters.service';
import { FiltersType } from '../types';
import { Pipe, PipeTransform } from '@angular/core';
import { map, tap } from 'rxjs';
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
  private readonly overlay = inject(Overlay);
  private defaultFilters: Array<keyof FiltersType> = ['System', 'Discipline', 'FIRE AREA', 'CALIBRATED RANGE MAX', 'CALIBRATED RANGE MAX_UOM', 'createdTime'];

  protected availableFilters: Array<keyof FiltersType> = [];
  protected readonly filters$ = inject(FiltersService).getFilters().pipe(
    tap((filters) => {
      this.availableFilters = Object.keys(filters) as Array<keyof FiltersType>;
    }),
    map(filters => Object.entries(filters))
  );
  protected readonly selectionModel = new SelectionModel<keyof FiltersType>(true);
  protected scrollStrategy!: ScrollStrategy;

  isDropdownOpen = false;

  ngOnInit(): void {
    this.scrollStrategy = this.overlay.scrollStrategies.reposition();
    this.selectionModel.select(...this.defaultFilters)
  }
  onSelectionChange(values: Array<string>, source: keyof FiltersType): void {
    console.log(values, source)
  }

  onSliderChange(value: number, source: keyof FiltersType): void {
    console.log(value, source)
  }

  onDateChange(date: number, source: keyof FiltersType) {
    console.log(date, source)
  }

}
