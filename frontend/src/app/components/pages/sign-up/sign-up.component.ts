import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { SignInComponent } from '../sign-in/sign-in.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, FormsModule, MatDialogModule, MatInputModule, MatProgressBarModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {

  otp = '';
  name = '';
  email: string = '';
  phonenumber?: number;
  otpSent = false;
  isLoading = false;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<SignUpComponent>) { }

  ngOnInit(): void {
  }

  goToBack() {
    this.otpSent = false;
    this.email = '';
    this.otp = '';
  }

  signUp() {
    this.isLoading = true;
    this.userService.register({ name: this.name, email: this.email, phonenumber: this.phonenumber }).subscribe({
      next: (res: any) => {
        console.log({ res });
        this.isLoading = false;
        this.otpSent = true;
        this.toastrService.success(res.message);
      },
      error: (err) => {
        this.isLoading = false;
        const message = err?.error?.message || 'Failed to send OTP.';
        this.toastrService.error(message);
      }
    });
  }

  verifyOtp() {
    this.isLoading = true;
    this.userService.verifyOtp(this.email, this.otp).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.dialogRef.close();
        this.toastrService.success(`Welcome to the Food Mine ${res.name}`);
        this.router.navigateByUrl('foods');
      },
      error: (err) => {
        this.isLoading = false;
        const message = err?.error?.message || 'OTP verification failed.';
        this.toastrService.error(message);
      }
    });
  }

  openSignInDialog() {
    this.dialog.closeAll();
    this.dialog.open(SignInComponent, {
      width: '600px',
      disableClose: true
    });
  }

  close() {
    this.dialogRef.close();
  }
}
