import { Component, OnInit } from '@angular/core';
import { SpecialDate } from '../models/special-date';
import { Observable } from 'rxjs';
import { SpecialDateService } from '../services/special-date.service';

@Component({
  selector: 'app-special-date',
  templateUrl: './special-date.component.html',
  styleUrls: ['./special-date.component.css']
})
export class SpecialDateComponent implements OnInit {

  $specialDates: Observable<Array<SpecialDate>>;
  specialDate: SpecialDate = new SpecialDate();
  state = {
    edit: false,
  };
  constructor(private specialDateService: SpecialDateService) { }

  ngOnInit() {
    this.load();
  }
  load() {
    this.$specialDates = this.specialDateService.retrieve();
  }

  add() {
    this.state.edit = true;
  }

  edit(specialDate: SpecialDate) {
    this.state.edit = true;
    this.specialDate = specialDate;
  }

  delete(specialDate: SpecialDate) {
    this.specialDateService
      .delete(specialDate._id)
      .subscribe(
        result => {
          this.state.edit = false;
          this.load();
          console.log(result);
        },
        error => console.log(error)
      );
  }


  create(specialDate: SpecialDate) {
    this.state.edit = true;
    this.specialDateService
      .create(specialDate)
      .subscribe(
        result => {
          this.state.edit = false;
          this.load();
          console.log(result);
        },
        error => console.log(error)
      );
  }

  update(specialDate: SpecialDate) {
    this.state.edit = true;
    this.specialDateService
      .update(specialDate)
      .subscribe(
        result => {
          this.state.edit = false;
          this.load();
          console.log(result);
        },
        error => console.log(error)
      );
  }

  save(specialDate: SpecialDate) {
    if (specialDate._id) {
      this.update(specialDate);
    } else {
      this.create(specialDate);
    }
  }
  cancel() {
    this.specialDate = {} as SpecialDate;
    this.state.edit = false;
  }

}
