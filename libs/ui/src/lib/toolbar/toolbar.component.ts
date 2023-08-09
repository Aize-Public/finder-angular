import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'aize-ui-toolbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header>
        <h1>Finder</h1>
    </header>
  `,
  styles: [`
    header {
      width: 100%;
      height: var(--spacing-four);
      background: var(--color-primary);
      color: white;
      display: flex;
      align-items: center;
      padding-left: var(--spacing-one);
    }
    h1 {
        font-size: var(--spacing-one-and-half)
      }
  `],
})
export class ToolbarComponent { }
