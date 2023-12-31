import {Component, OnInit} from '@angular/core';
import {ICours} from "../../interfaces";
import {PrivatbankService} from "../../services";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  courses:ICours[];
  currentDate: Date = new Date();

  constructor(private privatbankService:PrivatbankService) {
  }

  ngOnInit():void {
    this.privatbankService.getCurrencies().subscribe(
        data => {
          this.courses = data
        },
        error => {
          console.error('There was an error!', error);
        }
    );
    // this.privatbankService.getCurrencies().subscribe(data=> this.courses = data);
  }

}
