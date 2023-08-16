import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'aize-ui-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  @Input()
  label = '';

  @Input()
  get min(): string {
    return this._min;
  }
  set min(date: number) {
    this._min = this.formatDate(new Date(date));
  }
  private _min = '';

  @Output()
  dateChange = new EventEmitter<number>()


  @Input()
  get max(): string {
    return this._max;
  }
  set max(date: number) {
    this._max = this.formatDate(new Date(date));
  }
  private _max = '';

  onDateChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.dateChange.emit(new Date(value).getTime());
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
