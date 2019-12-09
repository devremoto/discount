import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  $users: Observable<Array<User>>;
  user: User = new User();
  state = {
    edit: false,
  };
  logggedUser: User;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.load();
  }
  load() {
    this.$users = this.userService.retrieve();
    const userStr = sessionStorage.getItem('user');
    this.logggedUser = JSON.parse(userStr) as User;
  }

  add() {
    this.state.edit = true;
    this.user = {} as User;
  }

  edit(user: User) {
    this.state.edit = true;
    this.user = user;
  }

  delete(user: User) {
    this.userService
      .delete(user._id)
      .subscribe(
        result => {
          this.state.edit = false;
          this.load();
          console.log(result);
        },
        error => console.log(error)
      );
  }


  create(user: User) {
    this.state.edit = true;
    this.userService
      .create(user)
      .subscribe(
        result => {
          this.state.edit = false;
          this.load();
          console.log(result);
        },
        error => console.log(error)
      );
  }

  update(user: User) {
    this.state.edit = true;
    this.userService
      .update(user)
      .subscribe(
        result => {
          this.state.edit = false;
          this.load();
          console.log(result);
        },
        error => console.log(error)
      );
  }

  save(user: User) {
    if (user._id) {
      this.update(user);
    } else {
      this.create(user);
    }
  }
  cancel() {
    this.user = {} as User;
    this.state.edit = false;
  }

  login(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.logggedUser = user;
    window.location.href = '/product';
  }
  logout(user: User) {
    sessionStorage.setItem('user', null);
    this.logggedUser = null;
    window.location.href = '/product';
  }


}
