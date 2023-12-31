import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {ICours} from "../interfaces";
import {baseUrl} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class PrivatbankService {
  constructor(private httpClient : HttpClient) {}

getCurrencies(){
    return this.httpClient.get<ICours[]>(baseUrl)
}
}
