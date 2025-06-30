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
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, FormsModule, MatDialogModule, MatInputModule, MatProgressBarModule, MatIconModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {

  otp = '';
  email: string = '';
  otpSent = false;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<SignInComponent>) { }

  ngOnInit(): void {

  }

  goToBack() {
    this.otpSent = false;
    this.email = '';
    this.otp = '';
  }

  login() {
    this.userService.login({ email: this.email }).subscribe({
      next: (res: any) => {
        console.log({ res });
        this.otpSent = true;
        this.toastrService.success(res.message || 'OTP sent successfully');
      },
      error: (err) => {
        const message = err?.error?.message || 'Failed to send OTP.';
        this.toastrService.error(message);
      }
    });
  }

  verifyOtp() {
    this.userService.verifyOtp(this.email, this.otp).subscribe({
      next: (res: any) => {
        this.dialogRef.close();
        this.toastrService.success(`Welcome to the Food Mine ${res.name}`);
        this.router.navigateByUrl('foods');
      },
      error: (err) => {
        const message = err?.error?.message || 'OTP verification failed.';
        this.toastrService.error(message);
      }
    });
  }

  openSignUpDialog() {
    this.dialog.closeAll();
    this.dialog.open(SignUpComponent, {
      width: '600px',
      disableClose: true
    });
  }

  close() {
    this.dialogRef.close();
  }

  // sendOtp() {
  //   this.userService.sendOtp(this.email).subscribe({
  //     next: (res: any) => {
  //       console.log({ res })
  //       this.otpSent = true;
  //       this.message = res.message;
  //     },
  //     error: (err) => {
  //       this.message = err?.error?.message || err?.message || 'Failed to send OTP.';
  //     }
  //   });
  // }

  // verifyOtp() {
  //   this.userService.verifyOtp(this.email, this.otp).subscribe({
  //     next: (res: any) => {
  //       this.message = res.message;
  //       this.router.navigateByUrl(this.returnUrl);
  //     },
  //     error: (err) => {
  //       this.message = err?.error?.message || err?.message || 'OTP verification failed.';
  //     }
  //   });
  // }
}
