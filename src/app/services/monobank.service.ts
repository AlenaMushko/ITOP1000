import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';

import { baseUrl, codeConstant } from '../constants';
import { ICours, ICoursMono } from '../interfaces/cours.interface';

@Injectable({
  providedIn: 'root',
})
export class MonobankService {
  private cache$: Observable<ICours[]> | null = null;
  private lastUpdate: Date | null = null;
  private cacheLifeTime = 60 * 60 * 1000;

  constructor(private readonly httpClient: HttpClient) {}

  getCurrencies(): Observable<ICours[]> {
    const now = new Date();

    if (
      this.cache$ &&
      this.lastUpdate &&
      now.getTime() - (this.lastUpdate.getTime() + this.cacheLifeTime) <= 0
    ) {
      return this.cache$;
    }

    if (!this.cache$) {
      this.cache$ = this.httpClient.get<ICoursMono[]>(baseUrl).pipe(
        map(data => this.processCurrencies(data)),
        tap(() => (this.lastUpdate = new Date())),
        shareReplay(1),
        catchError(err => {
          this.cache$ = null;
          return throwError(err);
        })
      );
    }

    return this.cache$;
  }

  private processCurrencies(data: ICoursMono[]): ICours[] {
    return data.reduce<ICours[]>((acc, value) => {
      const { currencyCodeB, currencyCodeA, rateBuy, rateSell } = value;
      if (currencyCodeB === codeConstant.codeUAH) {
        if (currencyCodeA === codeConstant.codeUSD) {
          acc.push({
            ccy: 'USD',
            base_ccy: 'UAH',
            buy: String(rateBuy),
            sale: String(rateSell),
          });
        }
        if (currencyCodeA === codeConstant.codeEUR) {
          acc.push({
            ccy: 'EUR',
            base_ccy: 'UAH',
            buy: String(rateBuy),
            sale: String(rateSell),
          });
        }
      }
      return acc;
    }, []);
  }
}
