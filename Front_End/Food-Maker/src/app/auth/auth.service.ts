import { Injectable } from '@angular/core';
import { IUser, IUserLogin, IUserRegister, IUserResponse } from '../interface/user.interface';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from '../service/http.service';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly httpService: HttpService,
    private readonly router: Router,
    private readonly userService: UserService,
  ) { }

  login(body: IUserLogin) {
    const loginSubscription = this.httpService
      .post<IUserResponse, object>(
        "/login",
        {
          correo: body.username,
          contrasenia: body.password,
        }
      )

    loginSubscription.subscribe(response => this.handleLogin(response))
  }

  handleLogin(response: IUserResponse) {
    if(!response) {
      alert("No puedes logear")
      return 
    }

    const { token, ...restResponseAux } = response

    const restResponse = {
      name: restResponseAux.nombre,
      email: restResponseAux.correo,
    }

    sessionStorage.setItem("jwt", token)
    sessionStorage.setItem("user", JSON.stringify(restResponse))

    const userAux: IUser = {...restResponse, token}

    this.userService.setUser(userAux)
    
    this.router.navigate(["/welcome"])
  }

  register(body: IUserRegister) {
    const registerSubscription = this.httpService
      .post<IUser, object>(
        "/registrar",
        {
          correo: body.email,
          nombre: body.name,
          contrasenia: body.password,
        }
      )

    registerSubscription.subscribe(response => this.handleRegister(response))
  }

  private handleRegister(response: IUser) {
    this.userService.setUser(response)
    this.router.navigate(["/login"])
  }
}
