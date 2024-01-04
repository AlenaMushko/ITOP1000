import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICours } from '../../interfaces';
import { MonobankService } from '../../services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  courses: ICours[];
  currentDate: Date = new Date();

  constructor(private readonly monobankService: MonobankService) {}

  ngOnInit(): void {
    this.monobankService
      .getCurrencies()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => (this.courses = data));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
