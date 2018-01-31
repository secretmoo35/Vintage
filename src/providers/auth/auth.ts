import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../../app/app.constants';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  API_URL: string = Constants.URL;

  // temporary solution
  _credentials: any = {};

  constructor(
    public http: HttpClient,
    private translate: TranslateService
  ) {

  }

  setHeader() {
    let header = new HttpHeaders()
    header = header.append('Content-Type', 'application/json');
    header = header.append('Accept', 'application/json');
    header = header.append('Authorization', 'Bearer ' + window.localStorage.getItem('token'));
    return header;
  }

  authenticated(): Promise<any> {
    return new Promise((resolve, reject) => {
      let token = window.localStorage.getItem('token');
      resolve(tokenNotExpired('Bearer', token));
    });
  }

  updateUser(user) {
    let header = this.setHeader();
    return this.http.put(this.API_URL + '/api/usermanage/' + user._id, user, { headers: header })
      .toPromise()
      .then(response => this.updateSuccess(response))
      .catch(this.handleError);
  }

  login(credentials) {
    return this.http.post(this.API_URL + "/api/auth/signin", credentials)
      .toPromise()
      .then(response => this.loginSuccess(response))
      .catch(this.handleError);
  }

  signup(credentials) {
    this._credentials = credentials;
    return this.http.post(this.API_URL + "/api/auth/signup", credentials)
      .toPromise()
      .then(response => this.registerSuccess(response))
      .catch(this.handleError);
  }

  logout() {
    window.localStorage.removeItem('user@' + this.API_URL);
    window.localStorage.removeItem('token');
    console.log('logout');
  }

  private updateSuccess(res) {
    window.localStorage.setItem('user@' + this.API_URL, JSON.stringify(res));
    return res;
  }

  private loginSuccess(res) {
    window.localStorage.setItem('user@' + this.API_URL, JSON.stringify(res));
    window.localStorage.setItem('token', res.loginToken);
    return res;
  }

  private registerSuccess(res) {
    window.localStorage.setItem('user@' + this.API_URL, JSON.stringify(res));
    window.localStorage.setItem('token', res.loginToken);
    return res;
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.error || error);
  }

}
