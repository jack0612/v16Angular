import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';
import { OrderEntryConstants } from '../models/order-entry-constants';
import { FormUtil } from '../utils/form.util';



enum HttpMethods {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE',
  options = 'OPTIONS',
}

export interface ApiGateway {
  request(url: string, method: HttpMethods, body: any);
}

@Injectable()
export class ApiGateway implements ApiGateway {

  private headers: HttpHeaders = new HttpHeaders(
    {
      'Content-Type': 'application/vnd.cpc.orderentry-v1+json',
      'Accept': 'application/vnd.cpc.orderentry-v1+json',
      'Accept-Language':  (window.location?.href.indexOf('/fr/') !== -1 )? OrderEntryConstants.LANG_FR : OrderEntryConstants.LANG_EN,
    }
  );

  constructor(private http: HttpClient,
    private translate: TranslateService) {
  }

  request(url: string, method: any, body?: any) {
    const req = new HttpRequest(method, url);
    return this.http.request(req).pipe(
      map((resp: HttpResponse<any>) => {
        return resp;
      })
    );
  }

  get(url: string, config?: any, silenceError?: boolean): Observable<any> {
    const reqObservable = this.http.get(url, config);
    return this.processResponse(reqObservable, url, silenceError);

  }

  post(url: string, payload: any, processPayload = true, silenceError?: boolean) {
    if (processPayload) {
      payload = FormUtil.processForm(payload);
    }

    const reqObservable = this.http.post(url, payload, {
      headers: this.headers,
    });

    return this.processResponse(reqObservable, url, silenceError);
  }

  put(url: string, payload: any, processPayload = true, silenceError?: boolean) {
    if (processPayload) {
      payload = FormUtil.processForm(payload);
    }

    const reqObservable = this.http.put(url, payload, {
      headers: this.headers,
    });

    return this.processResponse(reqObservable, url, silenceError);
  }

  delete(url: string, silenceError?: boolean) {
    const reqObservable = this.http.delete(url);

    return this.processResponse(reqObservable, url, silenceError);
  }

  private processResponse(obs, url, silenceErrors: boolean = false): Observable<any> {
    return obs;
  }






}
