import {Component, OnInit} from '@angular/core';
import {ICours} from "../../interfaces";
import {MonobankService} from "../../services";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  courses:ICours[];
  currentDate: Date = new Date();

  constructor(private monobankService:MonobankService) {
  }

  ngOnInit(): void {
    this.monobankService.getCurrencies().subscribe(data => this.courses = data);
  }

}
