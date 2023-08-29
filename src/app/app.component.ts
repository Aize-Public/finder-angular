import { SearchFieldComponent, ToolbarComponent } from '@aize/ui';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Subject, map, tap } from 'rxjs';
import { ApiService } from './api.service';
import { DataGridComponent } from './data-grid/data-grid.component';
import { FiltersComponent } from './filters/filters.component';
import { Filters, SearchResponse } from './types';
import { FiltersService } from './filters/filters.service';

@Component({
  standalone: true,
  imports: [HttpClientModule, ToolbarComponent, SearchFieldComponent, DataGridComponent, FiltersComponent, CommonModule],
  providers: [ApiService, FiltersService],
  selector: 'aize-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  private readonly api = inject(ApiService);

  protected readonly meta$ = inject(FiltersService).getMeta();
  protected filters = new Subject<Filters>();
  protected data$ = this.api.getAll().pipe(
    tap(({ aggregations, stats }) => this.filters.next({ aggregations, stats })),
    map(response => response.results)
  );
  protected activeQuery = '';

  onSearchChange(query: string): void {
    this.activeQuery = query;
    this.data$ = this.api.post<SearchResponse>('api/search', { query }).pipe(map(response => response.results));
  }
}
