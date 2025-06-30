import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_SIGN_IN, USER_SIGN_UP, USER_VERIFY_OTP } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { IUserSignUp } from '../shared/interfaces/IUserSignUp';
import { IUserSignIn } from '../shared/interfaces/IUserSignIn';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): User {
    return this.userSubject.value;
  }

  // login(userLogin: IUserLogin): Observable<User> {
  //   return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
  //     tap({
  //       next: (user) => {
  //         this.setUserToLocalStorage(user);
  //         this.userSubject.next(user);
  //         this.toastrService.success(
  //           'Login Successful'
  //         )
  //       },
  //       error: (errorResponse) => {
  //         this.toastrService.error(errorResponse.error, 'Login Failed');
  //       }
  //     })
  //   )
  // }

  // register(userRegister: IUserRegister): Observable<User> {
  //   return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
  //     tap({
  //       next: (user) => {
  //         this.setUserToLocalStorage(user);
  //         this.userSubject.next(user);
  //         this.toastrService.success(
  //           `Welcome to the Foodmine ${user.name}`,
  //           'Register successful'
  //         )
  //       },
  //       error: (errorResponse) => {
  //         this.toastrService.error(errorResponse.error, 'Register Failed');
  //       }
  //     })
  //   )
  // }

  // signUp(userSignup: IUserSignUp): Observable<User> {
  //   return this.http.post<User>(USER_SIGN_UP, userSignup).pipe(
  //     tap({
  //       next: (user) => {
  //         // this.setUserToLocalStorage(user);
  //         // this.userSubject.next(user);
  //         this.toastrService.success(
  //           `Welcome to the Foodmine ${user.name}`,
  //           // 'Register successful'
  //         )
  //       },
  //       error: (errorResponse) => {
  //         // this.toastrService.error(errorResponse.error, 'Register Failed');
  //       }
  //     })
  //   )
  // }

  // signIn(userSignin: IUserSignIn): Observable<User> {
  //   return this.http.post<User>(USER_SIGN_IN, userSignin).pipe(
  //     tap({
  //       next: (user) => {
  //         // this.setUserToLocalStorage(user);
  //         // this.userSubject.next(user);
  //         // this.toastrService.success(
  //         //   'Login Successful'
  //         // )
  //       },
  //       error: (errorResponse) => {
  //         this.toastrService.error(errorResponse.error, 'Login Failed');
  //       }
  //     })
  //   )
  // }

  login(userSignin: IUserSignIn) {
    return this.http.post<User>(USER_SIGN_IN, userSignin);
  }

  register(userSignup: IUserSignUp) {
    return this.http.post<User>(USER_SIGN_UP, userSignup);
  }

  verifyOtp(email: string, otp: string): Observable<User> {
    return this.http.post<User>(USER_VERIFY_OTP, { email, otp }).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
        },
        error: () => {
          this.toastrService.error('OTP Verify Failed');
        }
      })
    )
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
