import { Component, Input } from '@angular/core';
import { ICours } from '../../interfaces';
import { currencyConstant } from '../../constants';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css'],
})
export class CurrencyConverterComponent {
  @Input() baseCurrency: string;
  @Input() isMobile: boolean;
  @Input() courses: ICours[];

  currencyTo: string = '';
  inputValue1: number | null = null;
  inputValue2: number | null = null;
  activeInput: string = '';

  setActiveInput(inputName: string, inputValue: number | null): void {
    this.activeInput = inputName;
    if (inputName === 'input1') {
      this.inputValue1 = inputValue;
      this.inputValue2 = null;
    } else if (inputName === 'input2') {
      this.inputValue2 = inputValue;
      this.inputValue1 = null;
    }
  }

  setSelect(selectedCurrency: string): void {
    this.currencyTo = selectedCurrency;

    this.activeInput === 'input1'
      ? (this.inputValue2 = null)
      : (this.inputValue1 = null);
  }

  onClickCalculation(): void {
    let valueInUAH: number | null;

    if (this.baseCurrency === this.currencyTo) {
      this.activeInput === 'input1'
        ? (this.inputValue2 = this.inputValue1)
        : (this.inputValue1 = this.inputValue2);
    } else if (this.currencyTo === currencyConstant.UAH) {
      this.activeInput === 'input1'
        ? (this.inputValue2 = this.convertUAH(
            this.inputValue1,
            this.baseCurrency,
            'sale'
          ))
        : (this.inputValue1 = this.convertUAH(
            this.inputValue2,
            this.baseCurrency,
            'buy'
          ));
    } else {
      if (this.activeInput === 'input1') {
        valueInUAH = this.convertUAH(
          this.inputValue1,
          this.baseCurrency,
          'sale'
        );
        this.inputValue2 = valueInUAH
          ? this.convertUAH(valueInUAH, this.currencyTo, 'buy')
          : 0;
      } else {
        valueInUAH = this.convertUAH(this.inputValue2, this.currencyTo, 'sale');
        this.inputValue1 = valueInUAH
          ? this.convertUAH(valueInUAH, this.baseCurrency, 'buy')
          : 0;
      }
    }
  }

  private convertUAH(
    value: number | null,
    currency: string,
    action: 'buy' | 'sale'
  ): number | null {
    if (value === null) {
      return null;
    }
    const currencyData = this.courses.find(item => item.ccy === currency);
    if (currencyData) {
      const result =
        action === 'buy'
          ? value / +currencyData.buy
          : value * +currencyData.sale;
      return +result.toFixed(2);
    }
    return null;
  }
}
