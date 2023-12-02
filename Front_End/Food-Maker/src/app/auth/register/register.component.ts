import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { IUserRegister } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    name: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private readonly authService: AuthService
  ) {}

  handleRegisterSubmit() {
    const isValid = this.registerForm.valid

    if(!isValid) {
      alert("Ta mal")
      return
    }

    const body: IUserRegister = this.registerForm.value

    this.authService.register(body)
  }
}
