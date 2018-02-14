import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
import { Constants } from '../../app/app.constants';

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {
  API_URL: string = Constants.URL;
  constructor(
    public http: HttpClient,
    private auth: AuthProvider
  ) {

  }

  getBadgeNotification() {
    let header = this.auth.setHeader();
    return this.http.get(this.API_URL + '/api/getbadge', { headers: header })
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }

  getNotification() {
    let header = this.auth.setHeader();
    return this.http.get(this.API_URL + '/api/userownernotifications', { headers: header })
      .toPromise()
      .then(response => response as Array<any>)
      .catch(this.handleError);
  }

  readNotification(id) {
    let header = this.auth.setHeader();
    return this.http.get(this.API_URL + '/api/userownerreadnotification/' + id, { headers: header })
      .toPromise()
      .then(response => response as Array<any>)
      .catch(this.handleError);
  }

  deleteNotification(id) {
    let header = this.auth.setHeader();
    return this.http.delete(this.API_URL + '/api/notifications/' + id, { headers: header })
      .toPromise()
      .then(response => response as Array<any>)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    // this.log.errorService('An error occurred', error);
    return Promise.reject(error.message || error);
  }


}
