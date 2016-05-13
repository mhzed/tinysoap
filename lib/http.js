/*
 * Copyright (c) 2011 Vinay Pulim <vinay@milewise.com>
 * MIT Licensed
 */

var url = require('./url');
var ajax = require('./ajax')

var VERSION = "0.2.0";

exports.request = function(rurl, data, callback, exheaders, exoptions) {

  if (typeof window !== 'undefined') {

    headers = {
        "Accept": "text/html,application/xhtml+xml,application/xml",
        "Content-Type" : "application/x-www-form-urlencoded",
    };
    exheaders = exheaders || {};
    for (var attr in exheaders) {
      headers[attr] = exheaders[attr];
    }
    ajax.send(rurl, function(xhr){
      var resp = {statusCode: xhr.status};
      var status = Math.floor(xhr.status/100);
      if(status === 2){
        callback(null, resp, xhr.responseText);
      } else {
        callback("Eroor:: " + xhr.status, resp, xhr.responseText);
      }
    },data ? "POST" : "GET", data, headers);

  } else {  // nodejs

    var curl = url.parse(rurl);
    var secure = curl.protocol == 'https:';
    var host = curl.hostname;
    var port = parseInt(curl.port || (secure ? 443 : 80));
    var path = [curl.pathname || '/', curl.search || '', curl.hash || ''].join('');
    var method = data ? "POST" : "GET";
    var headers = {
      "User-Agent": "node-soap/" + VERSION,
      "Accept": "text/html,application/xhtml+xml,application/xml",
      "Accept-Encoding": "none",
      "Accept-Charset": "utf-8",
      "Connection": "close",
      "Host": host
    };

    if (typeof data == 'string') {
      headers["Content-Length"] = Buffer.byteLength(data, 'utf8');
    }

    exheaders = exheaders || {};
    for (var attr in exheaders) {
      headers[attr] = exheaders[attr];
    }

    var options = curl;
    options.method = method;
    options.headers = headers;

    exoptions = exoptions || {};
    for (var attr in exoptions) {
      options[attr] = exoptions[attr];
    }

    var p;
    if (secure)  p = require('https')
    else p = require("http")

    var request = p.request(options, function (res, body) {
      var body = "";
      res.on('data', function (chunk) {
        body += chunk;
      })
      res.on("end", function () {
        callback(null, res, body);
      })
    });
    request.on('error', callback);
    request.end(data);
  }
}
