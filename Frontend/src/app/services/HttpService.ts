import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpService {
  options: any;

  constructor(private http: HttpClient) {
  }

  prepareUrl(url: string, usePrefix: boolean = true): string {
    if (url.indexOf('://') === -1 && usePrefix) {
      return environment.apiUrl + url;
    }
    return url;
  }


  post<T>(url: string, object: any) {
    return this.http.post<T>(this.prepareUrl(url), object);
  }

  delete<T>(url: string) {
    return this.http.delete<T>(this.prepareUrl(url));
  }

  put<T>(url: string, object: any) {
    return this.http.put<T>(this.prepareUrl(url), object);
  }

  get<T>(url: string, params?: any, usePrefix: boolean = true) {
    return this.http.get<T>(this.prepareUrl(url + (params ? this.param(params) : ''), usePrefix), this.options);
  }

  param(obj: any) {
    const params = new URLSearchParams();
    for (const key in obj) {
      if (obj[key] && typeof obj[key] !== 'object') {
        params.set(key, obj[key]);
      }
    }
    if (params.toString()) {
      return '?' + params.toString();
    }
    return '';
  }
}
