import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [CommonModule, RouterModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  @Input() visible = false;

  @Input() notFoundImage = 'images/not-found/not-found.png';

  @Input() notFoundTitle = 'Page not found';

  @Input() notFoundMessage = `Uh-oh! Looks like the page you are trying to access, doesn't exist. Please start afresh.`;

  @Input() resetLinkText = 'Reset';

  @Input() resetLinkRoute = '/';
}
