import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {ICours} from "../interfaces";
import {baseUrl} from "../constants";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PrivatbankService {
    private proxyUrl = '/api/privatbank-proxy';
  constructor(private httpClient : HttpClient) {}

    getCurrencies(): Observable<any> {
        return this.httpClient.get(this.proxyUrl);
    }
// getCurrencies(){
//     return this.httpClient.get<ICours[]>(baseUrl)
// }
}
