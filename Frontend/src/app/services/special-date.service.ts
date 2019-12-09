import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';
import { HttpService } from './HttpService';
import { SpecialDate } from '../models/special-date';

@Injectable({
  providedIn: 'root'
})
export class SpecialDateService extends BaseService<SpecialDate> {

  constructor(protected httpService: HttpService) {
    super(httpService);
    this.setControler('special-dates');
  }
}
