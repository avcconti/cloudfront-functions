function handler(event) {
    console.log(event.request.headers);
    var request = event.request;
    var headers = request.headers;
    if(request.uri !=="/notLogged.html" && (!headers.authorization || (headers.authorization && headers.authorization.value.indexOf('Bearer XX') < 0))){
        var response = {
          statusCode: 302,
          statusDescription: 'Found',
          headers: {
            "location": { "value": "/notLogged.html" }
          }
        }
        return response;
    }
    if (headers['cloudfront-viewer-country']) {
      var countryCode = headers['cloudfront-viewer-country'].value.toLowerCase();
      if (["fr","en"].includes(countryCode)) {
        var response = {
          statusCode: 302,
          statusDescription: 'Found',
          headers: {
            "location": { "value": '/profile_' + countryCode + '.html' }
          }
        }
        return response;
      }
    }
    
    return request;
}