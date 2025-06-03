import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-suggestion-chips',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suggestion-chips.component.html',
  styleUrls: ['./suggestion-chips.component.css']
})
export class SuggestionChipsComponent {
  @Input() chips: string[] = [];
  @Output() chipSelected = new EventEmitter<string>();

  selectChip(chip: string) {
    this.chipSelected.emit(chip);
  }
}
