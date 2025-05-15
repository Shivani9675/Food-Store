import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'default-button',
  imports: [CommonModule],
  templateUrl: './default-buttton.component.html',
  styleUrl: './default-buttton.component.css'
})
export class DefaultButttonComponent implements OnInit {
  @Input() type: 'submit' | 'button' = 'submit';
  @Input() text: string = 'Submit';
  @Input() bgColor = '#e72929';
  @Input() color = 'white';
  @Input() fontSizeRem = 1.3;
  @Input() widthRem = 12;
  @Output() onClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
}
