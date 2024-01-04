import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

import { ICours } from '../../interfaces';
import { MonobankService } from '../../services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-input-converter',
  templateUrl: './input-converter.component.html',
  styleUrls: ['./input-converter.component.css'],
})
export class InputConverterComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  courses: ICours[];
  isMobile = false;

  constructor(private readonly monobankService: MonobankService) {}

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 650;
  }

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
