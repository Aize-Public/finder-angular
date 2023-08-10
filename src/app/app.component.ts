import { Component } from '@angular/core';
import { SearchFieldComponent, ToolbarComponent } from '@aize/ui';
import { DataGridComponent } from './data-grid/data-grid.component';

@Component({
  standalone: true,
  imports: [ToolbarComponent, SearchFieldComponent, DataGridComponent],
  selector: 'aize-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

}
