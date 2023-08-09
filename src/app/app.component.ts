import { Component } from '@angular/core';
import { SearchFieldComponent, ToolbarComponent } from '@aize/ui';

@Component({
  standalone: true,
  imports: [ToolbarComponent, SearchFieldComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

}
