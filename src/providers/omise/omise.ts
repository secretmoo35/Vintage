import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Omise from 'omise';
/*
  Generated class for the OmiseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OmiseProvider {

  constructor(public http: HttpClient) { }

  getTokenByCredit(omiseKey, payment) {
    let omise = new Omise(omiseKey);
    let detailCard = {
      card: {
        name: payment.paymenttype,
        number: payment.creditno,
        expiration_month: payment.expdate.substr(0, 2),
        expiration_year: payment.expdate.substr(3, 5),
        security_code: payment.creditcvc
      }
    };
    return new Promise((resolve, reject) => {
      omise.tokens.create(detailCard, (token) => {
      }).then(async function (data) {
        resolve(data);
      }).error(async function (err) {
        reject(err)
      }).done();
    })
  }

  payBanking(omiseKey, bank, money) {
    let omise = new Omise(omiseKey);
    money = money * 100;
    return new Promise((resolve, reject) => {
      omise.charges.create({
        'description': 'Charge for order ID:' + new Date(),
        'amount': money, // 1,000 Baht
        'currency': 'thb',
        "offsite": bank,
        "return_uri": "http://res.cloudinary.com/hzzat7wj2/image/upload/v1508831661/Pmss_new_jrnlia.png"
      }, function (err, resp) {
        if (err) {
          reject(err);
        }
        else {
          resolve(resp);
        }
      });
    });
  }

}
