import { Component, inject } from '@angular/core';
import { SearchFieldComponent, ToolbarComponent } from '@aize/ui';
import { DataGridComponent } from './data-grid/data-grid.component';
import { FiltersComponent } from './filters/filters.component';
import { SearchResponse } from './types';
import { map, tap } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';

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
  protected data$ = this.api.getAll();


  onSearchChange(query: string): void {
    this.data$ = this.api.post<SearchResponse>('api/search', { query }).pipe(map((response: SearchResponse) => response.results)).pipe(tap(console.log));
  }
}
