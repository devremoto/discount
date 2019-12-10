import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpService } from './HttpService';

@Injectable({ providedIn: 'root' })
export class BaseService<T> {
  protected controller: string;

  constructor(
    protected httpService: HttpService
  ) {
    if (!this.controller) {
      const comp: T = Object.assign({}, {} as T, {});

      this.controller = (comp as T).constructor.name;
    }
  }

  create(params?: any): Observable<T> {
    return this.httpService.post(`${this.controller}`, params).pipe(
      map<any, T>(response => {
        return response;
      })
    );
  }

  retrieve(): Observable<T[]> {
    return this.httpService.get(`${this.controller}`).pipe(
      map<any, T[]>(response => {
        return response;
      })
    );
  }

  retrieveById(id: any): Observable<T> {
    return this.httpService.get(`${this.controller}/${id}`).pipe(
      map<any, T>(response => {
        return response;
      })
    );
  }

  update(entity: T): Observable<T> {
    return this.httpService.put(this.controller, entity).pipe(
      map<any, T>(response => {
        const obj = response;
        return obj;
      })
    );
  }

  delete(id: any) {
    return this.httpService.delete(`${this.controller}/${id}`).pipe(
    );
  }

  setControler(controller: string): void {
    this.controller = controller;
  }
}
