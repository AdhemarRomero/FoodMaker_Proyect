import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { IUser } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userBehaviorSubject: BehaviorSubject<IUser> = new BehaviorSubject({} as IUser)
  user$ = this.userBehaviorSubject.asObservable()

  getUser() {
    return this.userBehaviorSubject.value
  }

  setUser(user: IUser) {
    this.userBehaviorSubject.next(user)
  }

  fetchCurrentUser() {
    const userString = sessionStorage.getItem("user")

    if(!userString) return

    const user = JSON.parse(userString)
    
    this.userBehaviorSubject.next(user)
  }
}
