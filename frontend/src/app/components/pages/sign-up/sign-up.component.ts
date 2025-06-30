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

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, FormsModule, MatDialogModule, MatInputModule, MatProgressBarModule, MatIconModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {

  otp = '';
  name = '';
  email: string = '';
  phonenumber?: number;
  otpSent = false;

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
    this.userService.register({ name: this.name, email: this.email, phonenumber: this.phonenumber }).subscribe({
      next: (res: any) => {
        console.log({ res });
        this.otpSent = true;
        this.toastrService.success(res.message);
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
