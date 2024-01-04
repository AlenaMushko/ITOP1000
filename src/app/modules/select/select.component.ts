import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent {
  @Input() currencies: string[];
  @Input() selectedCurrency: string;
  @Output() currencyChange = new EventEmitter<string>();

  constructor(private cdr: ChangeDetectorRef) {}

  onCurrencyChange(newCurrency: string) {
    this.currencyChange.emit(newCurrency);
    this.cdr.detectChanges();
  }
}
