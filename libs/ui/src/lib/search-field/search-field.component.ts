import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'aize-ui-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
  imports: [ReactiveFormsModule],
  standalone: true
})
export class SearchFieldComponent implements OnInit {
  protected readonly searchControl = new FormControl('')
  private readonly searchChanges$ = this.searchControl.valueChanges.pipe(filter(query => !!query), debounceTime(300), distinctUntilChanged(), takeUntilDestroyed());

  @Output()
  searchChanged = new EventEmitter<string>();

  ngOnInit(): void {
    this.searchChanges$.subscribe(query => query && this.searchChanged.emit(query))
  }
}
