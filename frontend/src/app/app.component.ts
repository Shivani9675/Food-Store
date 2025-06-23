import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/partials/header/header.component";
import { LoadingComponent } from './components/partials/loading/loading.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, LoadingComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  isSearch: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isSearch = this.router.url.startsWith('/search');
    })
  }
}
