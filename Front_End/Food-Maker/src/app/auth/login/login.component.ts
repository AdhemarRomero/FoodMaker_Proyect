import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { IUser, IUserLogin } from 'src/app/interface/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  user: IUser;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    const jwt = sessionStorage.getItem("jwt")

    if(!jwt) return

    this.router.navigate(["/welcome"])
  }

  handleLoginSubmit() {
    const isValid = this.loginForm.valid

    if(!isValid) {
      alert("Ta mal")
      return
    }

    const body: IUserLogin = this.loginForm.value

    this.authService.login(body)
  }
}
