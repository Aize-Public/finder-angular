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
export class MultiSelectComponent<T> implements OnInit, AfterViewInit {

  @ViewChild('tagsContainer') tagsContainer!: ElementRef<HTMLDivElement>;

  private readonly overlay = inject(Overlay);
  protected readonly selectionModel = new SelectionModel<T>(true);
  protected scrollStrategy!: ScrollStrategy;


  @Input()
  label = '';

  @Input()
  values: T[] = [];

  @Output()
  selectionChange = new EventEmitter();

  isDropdownOpen = false;
  selectedItems: string[] = [];
  maxVisibleTags = 0;

  get visibleItems(): T[] {
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

  toggleSelection(item: T) {
    this.selectionModel.toggle(item);
  }

  onApplyFilter(): void {
    if(this.selectionModel.selected.length !== this.values.length){
      this.selectionChange.emit(this.selectionModel.selected);
      this.isDropdownOpen = false;
    }
  }

  private calculateMaxVisibleTags(): void {
    const containerWidth = this.tagsContainer.nativeElement.offsetWidth - 40;
    const tagWidth = 85; // tmp
    this.maxVisibleTags = Math.floor(containerWidth / tagWidth);
  }
}
