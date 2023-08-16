import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'aize-ui-slider',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <label class="label">{{label}}</label>
    <div class="slider-container">
      <input class="slider" type="range" [min]="min" [max]="max" [(ngModel)]="value" (ngModelChange)="onSliderChange($event)" />
      <span>{{value}}</span>
    </div>
  `,
  styles: [
    `:host {
      min-width: 320px;
      gap: var(--spacing-quarter);
      display: flex;
      flex-direction: column;
      font-weight: lighter;
      .slider-container {
        display: flex;
        .slider {
          flex: 1
        }
      }
    }`
  ],
})
export class SliderComponent implements OnChanges {

  @Input()
  max = 100;

  @Input()
  min = 0;

  @Input()
  label = 'Label'

  @Input()
  range: Array<number> = []

  @Output()
  selectionChange = new EventEmitter();

  protected value = this.min;

  ngOnChanges(changes: SimpleChanges): void {
    const { min } = changes;
    if (min.isFirstChange()) {
      this.value = min.currentValue;
    }
  }

  protected onSliderChange(value: number): void {
    this.selectionChange.emit(value);
  }
}
