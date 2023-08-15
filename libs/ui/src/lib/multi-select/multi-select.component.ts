import { Overlay, OverlayModule, ScrollStrategy } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';


@Component({
  selector: 'aize-ui-multi-select',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
})
export class MultiSelectComponent implements OnInit, AfterViewInit {

  @ViewChild('tagsContainer') tagsContainer!: ElementRef;

  private readonly overlay = inject(Overlay);
  protected scrollStrategy!: ScrollStrategy;

  @Input()
  label = '';

  @Input()
  values = [];

  isDropdownOpen = false;
  selectedItems: string[] = [];
  maxVisibleTags = 0;

  get visibleItems(): string[] {
    return this.selectedItems.slice(0, this.maxVisibleTags);
  }

  ngOnInit(): void {
    this.scrollStrategy = this.overlay.scrollStrategies.reposition();
  }

  ngAfterViewInit(): void {
    this.calculateMaxVisibleTags();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleSelection(item: string) {
    if (this.selectedItems.includes(item)) {
      this.selectedItems = this.selectedItems.filter(i => i !== item);
    } else {
      this.selectedItems.push(item);
    }
  }

  removeSelected(item: string) {
    this.selectedItems = this.selectedItems.filter(i => i !== item);
  }

  private calculateMaxVisibleTags(): void {
    const containerWidth = this.tagsContainer.nativeElement.offsetWidth;
    const tagWidth = 150; // tmp
    this.maxVisibleTags = Math.floor(containerWidth / tagWidth);
  }
}
