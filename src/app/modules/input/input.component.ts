import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  @Input() value: number | null;
  @Input() baseCurrency: string;
  @Output() valueChange = new EventEmitter<number>();

  onValueChange(newValue: number) {
    this.valueChange.emit(newValue);
  }
}
