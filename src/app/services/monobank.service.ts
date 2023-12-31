import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {baseUrl, codeConstant} from "../constants";
import {ICours, ICoursMono} from "../interfaces/cours.interface";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MonobankService {
  constructor(private httpClient : HttpClient) {}

    getCurrencies(): Observable<ICours[]> {
        return this.httpClient.get<ICoursMono[]>(baseUrl)
            .pipe(
                map(data => this.processCurrencies(data))
            );
    }

    private processCurrencies(data: ICoursMono[]): ICours[] {
        return data.reduce<ICours[]>((acc, value) => {
            const {currencyCodeB, currencyCodeA, rateBuy, rateSell} = value;
            if (currencyCodeB === codeConstant.codeUAH) {
                if (currencyCodeA === codeConstant.codeUSD) {
                    acc.push({ ccy: 'USD', base_ccy: 'UAH', buy: String(rateBuy), sale: String(rateSell) });
                } else if (currencyCodeA === codeConstant.codeEUR) {
                    acc.push({ ccy: 'EUR', base_ccy: 'UAH', buy: String(rateBuy), sale: String(rateSell) });
                }
            }
            return acc;
        }, []);
    }
}
