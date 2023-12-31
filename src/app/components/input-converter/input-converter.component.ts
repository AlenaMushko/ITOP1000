import {Component, HostListener, OnInit} from '@angular/core';

import {ICours} from "../../interfaces";
import {MonobankService} from "../../services";
import { currencyConstant} from "../../constants";

@Component({
    selector: 'app-input-converter',
    templateUrl: './input-converter.component.html',
    styleUrls: ['./input-converter.component.css'],
})

export class InputConverterComponent implements OnInit {
    courses: ICours[];
    isMobile = false;

    currencyToUSD = '';
    inputValue1USD: number | null = null;
    inputValue2USD: number | null = null;
    activeInputUSD: string | null = null;

    currencyToEUR = '';
    inputValue1EUR: number | null = null;
    inputValue2EUR: number | null = null;
    activeInputEUR: string | null = null;

    constructor(private monobankService: MonobankService) {}


    @HostListener('window:resize')
    onResize() {
        this.checkScreenSize();
    }

    private checkScreenSize() {
        this.isMobile = window.innerWidth <= 650;
    }

    ngOnInit(): void {
        this.monobankService.getCurrencies().subscribe(data => this.courses = data);
    }

    setActiveInput(inputName: string | null, converterFrom: string, inputValue: number | null):void  {
        if (converterFrom === currencyConstant.USD) {
            this.activeInputUSD = inputName;
            inputName === "input1USD" ? this.inputValue1USD = inputValue : this.inputValue2USD = inputValue;
            inputName === "input1USD" ?  this.inputValue2USD = null :this.inputValue1USD =null;
        }
        if (converterFrom === currencyConstant.EUR) {
            this.activeInputEUR = inputName;
            inputName === "input1EUR" ? this.inputValue1EUR = inputValue : this.inputValue2EUR = inputValue;
            inputName === "input1EUR" ?  this.inputValue2EUR = null :this.inputValue1EUR =null;
        }
    }

    setSelect(defaultCurrency: string, selectedCurrency: string):void  {
        if (defaultCurrency === currencyConstant.USD) {
            this.currencyToUSD = selectedCurrency;
            this.activeInputUSD === 'input1USD' ? this.inputValue2USD = null : this.inputValue1USD = null;
        }
        if (defaultCurrency === currencyConstant.EUR) {
            this.currencyToEUR = selectedCurrency;
            this.activeInputEUR === 'input1EUR' ? this.inputValue2EUR = null : this.inputValue1EUR = null;

        }
    }

    onClickCalculation(currencyFrom: string, inputValue: number | null, inputName: string ) {
        let valueInUAH: number | null;

        if (currencyFrom === currencyConstant.USD){
            switch (this.currencyToUSD) {
                case currencyConstant.USD:
                    this.inputValue1USD = this.inputValue2USD = inputValue;
                    break;
                case currencyConstant.EUR:
                    //  USD => UAH => EUR
                    if(inputValue && inputName === 'input1USD'){
                        valueInUAH = this.convertUAH(inputValue, currencyConstant.USD, 'sale');
                        this.inputValue2USD = valueInUAH ? this.convertUAH(valueInUAH, currencyConstant.EUR, 'buy') : null;
                    }
                    // EUR => UAH => USD
                    if(inputValue && inputName === 'input2USD'){
                        valueInUAH = this.convertUAH(inputValue, currencyConstant.EUR, 'sale');
                        this.inputValue1USD = valueInUAH ? this.convertUAH(valueInUAH, currencyConstant.USD, 'buy') : null;
                    }
                    break;
                case 'UAH':
                    if(inputValue && inputName === 'input1USD'){
                        this.inputValue2USD = this.convertUAH(inputValue, currencyFrom, 'sale');
                    }
                    if(inputValue && inputName === 'input2USD'){
                        this.inputValue1USD = this.convertUAH(inputValue, currencyFrom, 'buy');
                    }
                    break;
            }
        }

        if (currencyFrom === currencyConstant.EUR){
            switch (this.currencyToEUR) {
                case currencyConstant.USD:
                    // EUR => UAH => USD
                    if(inputValue && inputName === 'input1EUR'){
                        valueInUAH = this.convertUAH(inputValue, currencyConstant.EUR, 'sale');
                        this.inputValue2EUR = valueInUAH ? this.convertUAH(valueInUAH, currencyConstant.USD, 'buy') : null;
                    }
                    //  USD => UAH => EUR
                    if(inputValue && inputName === 'input2EUR'){
                        valueInUAH = this.convertUAH(inputValue, currencyConstant.USD, 'sale');
                        this.inputValue1EUR = valueInUAH ? this.convertUAH(valueInUAH, currencyConstant.EUR, 'buy') : null;
                    }
                    break;
                case currencyConstant.EUR:
                    this.inputValue1EUR = this.inputValue2EUR = inputValue;
                    break;
                case currencyConstant.UAH:
                    if(inputValue && inputName === 'input1EUR'){
                        this.inputValue2EUR = this.convertUAH(inputValue, currencyFrom, 'sale');
                    }
                    if(inputValue && inputName === 'input2EUR'){
                        this.inputValue1EUR = this.convertUAH(inputValue, currencyFrom, 'buy');
                    }
                    break;
            }
        }
    }

    private convertUAH(value: number, currency: string, action: 'buy' | 'sale'): number | null{
        const currencyData = this.courses.find(item => item.ccy === currency);
        if (currencyData) {
            const result = action === 'buy'
                ? value / +currencyData.buy
                : value * +currencyData.sale;
            return +result.toFixed(2);
        }
        return null;
    }
}
