This module lets you connect to web services using SOAP, in pure javascript, using node or browser.

This module is branched from node module "soap@0.2.6".  Specific changes are:
 
* soap server removed
* use node-xml@1.0.2 as xml parser, because its pure javascript
* use jQuery $.ajax for http request, to support browser
* removed all other dependencies on nodejs modules 
  
Features (copied from soap@0.2.6 Readme.md):

* Very simple API
* Handles both RPC and Document schema types
* Supports multiRef SOAP messages (thanks to [@kaven276](https://github.com/kaven276))
* Support for both synchronous and asynchronous method handlers
* WS-Security (currently only UsernameToken and PasswordText encoding is supported)

## Install

Install with [npm](http://github.com/isaacs/npm):

```
  npm install tinysoap
```

## Browser

Embed jquery script first, for example:

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>

Then embed the file "./tinysoap-browser-min.js"

    <script src="tinysoap-browser-min.js"></script>
        
Then you write code such as:

    // in global scope:
    this.tinysoap.createClient("/ACMEWebService?WSDL", function(err, client) {
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
