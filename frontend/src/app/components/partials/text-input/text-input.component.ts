import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputContainerComponent } from "../input-container/input-container.component";
import { InputValidationComponent } from "../input-validation/input-validation.component";

@Component({
  selector: 'text-input',
  imports: [InputContainerComponent, InputValidationComponent, ReactiveFormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css'
})
export class TextInputComponent implements OnInit {
  @Input() control!: AbstractControl;
  @Input() showErrorsWhen: boolean = true;
  @Input() label!: string;
  @Input() type: 'text' | 'password' | 'email' = 'text';

  get formControl() {
    return this.control as FormControl;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
