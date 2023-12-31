import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";

import { baseUrl, codeConstant } from "../constants";
import { ICours, ICoursMono } from "../interfaces/cours.interface";
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MonobankService {
    private cache: ICours[] | null = null;
    private cacheUpdateTime: Date | null = null;
    private cacheExpirationMs = 60 * 60 * 1000;

    constructor(private httpClient: HttpClient) {}

    getCurrencies(): Observable<ICours[]> {
        const now = new Date();
        if (this.cache && this.cacheUpdateTime && (now.getTime() - this.cacheUpdateTime.getTime()) < this.cacheExpirationMs) {
            return of(this.cache);
        } else {
            return this.httpClient.get<ICoursMono[]>(baseUrl)
                .pipe(
                    map(data => {
                        const processedData = this.processCurrencies(data);
                        this.cache = processedData;
                        this.cacheUpdateTime = new Date();
                        return processedData;
                    })
                );
        }
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
