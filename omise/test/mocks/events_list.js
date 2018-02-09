var nock = require('nock');
nock('https://api.omise.co')
  .persist()
  .get('/events')
  .reply(200, {
    "object": "list",
    "from": "1970-01-01T00:00:00+00:00",
    "to": "2016-02-18T08:00:56+00:00",
    "offset": 0,
    "limit": 20,
    "total": 2,
    "order": "chronological",
    "data": [{
      "object": "event",
      "id": "evnt_test_52znern42lf1j7yy56u",
      "livemode": false,
      "location": "/events/evnt_test_52znern42lf1j7yy56u",
      "key": "charge.create",
      "created": "2016-02-11T12:27:15Z",
      "data": {
        "object": "charge",
        "id": "chrg_test_52znerhlcrw98oi6ncb",
        "livemode": false,
        "location": "/charges/chrg_test_52znerhlcrw98oi6ncb",
        "amount": 100000,
        "currency": "thb",
        "description": "Charge for order 3947",
        "status": "successful",
        "capture": true,
        "authorized": true,
        "paid": true,
        "transaction": "trxn_test_52znermgsd1w02c363l",
        "refunded": 0,
        "refunds": {
          "object": "list",
          "from": "1970-01-01T00:00:00+00:00",
          "to": "2016-02-11T12:27:15+00:00",
          "offset": 0,
          "limit": 20,
          "total": 0,
          "order": null,
          "location": "/charges/chrg_test_52znerhlcrw98oi6ncb/refunds",
          "data": [

          ]
        },
        "return_uri": "http://www.example.com/orders/3947/complete",
        "reference": "paym_test_52znerilq91cgs39zfj",
        "authorize_uri": "https://api-staging.omise.co/payments/paym_test_52znerilq91cgs39zfj/authorize",
        "failure_code": null,
        "failure_message": null,
        "card": {
          "object": "card",
          "id": "card_test_52znerada8cfnmw88wf",
          "livemode": false,
          "country": "us",
          "city": "Bangkok",
          "postal_code": "10320",
          "financing": "",
          "bank": "",
          "last_digits": "4242",
          "brand": "Visa",
          "expiration_month": 10,
          "expiration_year": 2017,
          "fingerprint": "m4QON3Fw51GFPBYc9O9W6Csz58cJyFNwhCydSAEtCNw=",
          "name": "JOHN DOE",
          "security_code_check": true,
          "created": "2016-02-11T12:27:13Z"
        },
        "customer": null,
        "ip": null,
        "dispute": null,
        "created": "2016-02-11T12:27:14Z"
      }
    }, {
      "object": "event",
      "id": "evnt_test_52zxzoxxiiz7nij39u6",
      "livemode": false,
      "location": "/events/evnt_test_52zxzoxxiiz7nij39u6",
      "key": "charge.create",
      "created": "2016-02-12T06:29:22Z",
      "data": {
        "object": "charge",
        "id": "chrg_test_52zxzou3a9kxjc2mh8q",
        "livemode": false,
        "location": "/charges/chrg_test_52zxzou3a9kxjc2mh8q",
        "amount": 100000,
        "currency": "thb",
        "description": "Charge for order 3947",
        "status": "successful",
        "capture": true,
        "authorized": true,
        "paid": true,
        "transaction": "trxn_test_52zxzoxg9dpuyugw3vg",
        "refunded": 0,
        "refunds": {
          "object": "list",
          "from": "1970-01-01T00:00:00+00:00",
          "to": "2016-02-12T06:29:22+00:00",
          "offset": 0,
          "limit": 20,
          "total": 0,
          "order": null,
          "location": "/charges/chrg_test_52zxzou3a9kxjc2mh8q/refunds",
          "data": [

          ]
        },
        "return_uri": "http://www.example.com/orders/3947/complete",
        "reference": "paym_test_52zxzow6kv0112r6ajo",
        "authorize_uri": "https://api-staging.omise.co/payments/paym_test_52zxzow6kv0112r6ajo/authorize",
        "failure_code": null,
        "failure_message": null,
        "card": {
          "object": "card",
          "id": "card_test_52zxzomxf584805u5xn",
          "livemode": false,
          "country": "us",
          "city": "Bangkok",
          "postal_code": "10320",
          "financing": "",
          "bank": "",
          "last_digits": "4242",
          "brand": "Visa",
          "expiration_month": 10,
          "expiration_year": 2017,
          "fingerprint": "m4QON3Fw51GFPBYc9O9W6Csz58cJyFNwhCydSAEtCNw=",
          "name": "JOHN DOE",
          "security_code_check": true,
          "created": "2016-02-12T06:29:21Z"
        },
        "customer": null,
        "ip": null,
        "dispute": null,
        "created": "2016-02-12T06:29:21Z"
      }
    }]
  }, {
    server: 'nginx/1.1',
    'content-type': 'application/json',
  });
