import { SelectionModel } from '@angular/cdk/collections';
import { Overlay, OverlayModule, ScrollStrategy } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';


@Component({
  selector: 'aize-ui-multi-select',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
})
export class MultiSelectComponent implements OnInit, AfterViewInit {

  @ViewChild('tagsContainer') tagsContainer!: ElementRef<HTMLDivElement>;

  private readonly overlay = inject(Overlay);
  protected readonly selectionModel = new SelectionModel<string>(true);
  protected scrollStrategy!: ScrollStrategy;


  @Input()
  label = '';

  @Input()
  values = [];

  @Output()
  selectionChange = new EventEmitter();

  isDropdownOpen = false;
  selectedItems: string[] = [];
  maxVisibleTags = 0;

  get visibleItems(): string[] {
    return this.selectionModel.selected.slice(0, this.maxVisibleTags);
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
    this.selectionModel.toggle(item);
    this.selectionChange.emit(this.selectionModel.selected);
  }

  private calculateMaxVisibleTags(): void {
    const containerWidth = this.tagsContainer.nativeElement.offsetWidth - 40;
    const tagWidth = 85; // tmp
    this.maxVisibleTags = Math.floor(containerWidth / tagWidth);
  }
}
