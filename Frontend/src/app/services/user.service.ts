import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';
import { User as User } from '../models/user';
import { HttpService } from './HttpService';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {

  constructor(protected httpService: HttpService) {
    super(httpService);
    this.setControler('users');
  }
}
