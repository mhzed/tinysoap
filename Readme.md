This module lets you connect to web services using SOAP, in pure javascript, using node or browser.

This module is forked from node module "tinysoap@1.0.2".  Specific changes are:

* You don't need jQuery anymore


Features (copied from soap@0.2.6 Readme.md):

* Very simple API
* Handles both RPC and Document schema types
* Supports multiRef SOAP messages (thanks to [@kaven276](https://github.com/kaven276))
* Support for both synchronous and asynchronous method handlers
* WS-Security (currently only UsernameToken and PasswordText encoding is supported)

## Install

Install with [npm](http://github.com/isaacs/npm):

```
  npm install johniak/browser-soap
```

## Browser



Then embed the file "./browser-soap-min.js"

    <script src="browser-soap-min.js"></script>

Then you write code such as:

    // in global scope:
    this['browser-soap'].createClient("/ACMEWebService?WSDL", function(err, client) {
      if (!err)
        console.log(client);  // all methods are stored in client
    });

Or in es6

    import soap from 'browser-soap'

    soap.createClient("/ACMEWebService?WSDL", function(err, client) {
      if (!err)
        console.log(client);  // all methods are stored in client
    });

JSONP is not currently supported, but should be very simple to add...

## Module

### soap.createClient(url, callback) - create a new SOAP client from a WSDL url

``` javascript
  var soap = require('soap');
  var url = 'http://example.com/wsdl?wsdl';
  var args = {name: 'value'};
  soap.createClient(url, function(err, client) {
      client.MyFunction(args, function(err, result) {
          console.log(result);
      });
  });
```

## Client

An instance of Client is passed to the soap.createClient callback.  It is used to execute methods on the soap service.

### Client.describe() - description of services, ports and methods as a JavaScript object

``` javascript
  client.describe() // returns
    {
      MyService: {
        MyPort: {
          MyFunction: {
            input: {
              name: 'string'
            }
          }
        }
      }
    }
```

### Client.setSecurity(security) - use the specified security protocol (see WSSecurity below)

``` javascript
  client.setSecurity(new WSSecurity('username', 'password'))
```

### Client.*method*(args, callback) - call *method* on the SOAP service.

``` javascript
  client.MyFunction({name: 'value'}, function(err, result) {
      // result is a javascript object
  })
```
### Client.*service*.*port*.*method*(args, callback) - call a *method* using a specific *service* and *port*

``` javascript
  client.MyService.MyPort.MyFunction({name: 'value'}, function(err, result) {
      // result is a javascript object
  })
```

## WSSecurity

WSSecurity implements WS-Security.  UsernameToken and PasswordText/PasswordDigest is supported. An instance of WSSecurity is passed to Client.setSecurity.

``` javascript
  new WSSecurity(username, password, passwordType)
    //'PasswordDigest' or 'PasswordText' default is PasswordText
```
