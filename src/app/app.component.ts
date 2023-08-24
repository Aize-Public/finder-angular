import { SearchFieldComponent, ToolbarComponent } from '@aize/ui';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from './api.service';
import { DataGridComponent } from './data-grid/data-grid.component';
import { FiltersComponent } from './filters/filters.component';
import { SearchResponse } from './types';

@Component({
  standalone: true,
  imports: [HttpClientModule, ToolbarComponent, SearchFieldComponent, DataGridComponent, FiltersComponent],
  providers: [ApiService],
  selector: 'aize-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  private readonly api = inject(ApiService);
  private readonly response$ = this.api.getAll();
  protected data$ = this.response$.pipe(map(response => response.results));

  activeQuery = '';

  onSearchChange(query: string): void {
    this.activeQuery = query;
    this.data$ = this.api.post<SearchResponse>('api/search', { query }).pipe(map(response => response.results));
  }
}
