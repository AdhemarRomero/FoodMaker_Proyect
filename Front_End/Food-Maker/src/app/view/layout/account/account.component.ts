import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/interface/user.interface';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: IUser = {} as IUser


  accountForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor (
    private readonly userService: UserService,
  ) { }

  ngOnInit(): void {
    this.takeUser()
  }

  takeUser() {
    this.userService.user$.subscribe(
      (user) => this.handleTakeUser(user)
    )
  }

  handleTakeUser(user: IUser) {
    this.accountForm.get("username").setValue(user.name)
    this.accountForm.get("email").setValue(user.email)
  }

  handleAccountSubmit() {
    const isValid = this.accountForm.valid

    if(!isValid) {
      alert("Ta mal")
      return
    }

    console.log(this.accountForm.value)
  }
}
