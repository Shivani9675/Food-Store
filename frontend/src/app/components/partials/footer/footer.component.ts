import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  public emailForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  sendEmail() {
    if (this.emailForm.valid) {
      console.log('Valid email:', this.emailForm.value.email);
      this.emailForm.reset();
      this.toastr.success('Thank you for joining our mailing list')
    } else {
      this.toastr.error('Please enter a valid email address.');
    }
  }
}
