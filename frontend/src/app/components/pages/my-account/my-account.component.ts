import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-my-account',
  imports: [CommonModule, MatIconModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent implements OnInit {
  @ViewChild('myStuffWrapper') myStuffWrapper!: ElementRef;
  @ViewChild('mySubStuffWrapper') mySubStuffWrapper!: ElementRef;

  user!: User;
  showStickyHeader = false;
  showWhiteBackground = false;

  constructor(private cdr: ChangeDetectorRef) { }

  @HostListener('window:scroll', [])
  onScrollListener() {
    this.onScroll();
  }

  ngOnInit(): void {
    this.getUserDetails();
  }

  ngAfterViewInit() {
    this.onScroll();
    this.cdr.detectChanges();
  }

  private onScroll() {
    const headerEl = document.querySelector('header') as HTMLElement;
    if (!headerEl || !this.mySubStuffWrapper) return;

    const headerBottom = headerEl.getBoundingClientRect().bottom;
    const myStuffWrapper = this.myStuffWrapper.nativeElement.getBoundingClientRect().top;
    this.showWhiteBackground = myStuffWrapper <= headerBottom;
    console.log("showWhiteBackground", this.showWhiteBackground)

    const mySubStuffTop = this.mySubStuffWrapper.nativeElement.getBoundingClientRect().top;
    this.showStickyHeader = mySubStuffTop <= headerBottom;
    console.log("showStickyHeader", this.showStickyHeader)

    headerEl.style.display = this.showStickyHeader ? 'none' : 'block';
    headerEl.style.opacity = this.showStickyHeader ? '0' : '1';
    headerEl.style.pointerEvents = this.showStickyHeader ? 'none' : 'auto';
  }

  ngOnDestroy(): void {
    const headerEl = document.querySelector('header') as HTMLElement;
    if (headerEl) {
      headerEl.style.display = 'block';
      headerEl.style.opacity = '1';
      headerEl.style.pointerEvents = 'auto';
    }
  }

  getUserDetails() {
    const userData = localStorage.getItem('User');
    if (userData) {
      this.user = JSON.parse(userData) as User;
    } else {
      console.warn('No user found in localStorage.');
    }
  }
}
