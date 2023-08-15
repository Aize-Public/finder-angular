import { Component } from '@angular/core';
import { SearchFieldComponent, ToolbarComponent } from '@aize/ui';
import { DataGridComponent } from './data-grid/data-grid.component';
import { FiltersComponent } from './filters/filters.component';

@Component({
  standalone: true,
  imports: [ToolbarComponent, SearchFieldComponent, DataGridComponent, FiltersComponent],
  selector: 'aize-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

}
