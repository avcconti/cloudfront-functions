function handler(event) {
    var request = event.request;
    var headers = request.headers;
    if(request.uri !=="/notLogged.html"){
        if(!headers.authorization || (headers.authorization && headers.authorization.value.indexOf('Bearer XX') < 0)){
            var response = {
              statusCode: 302,
              statusDescription: 'Found',
              headers: {
                "location": { "value": "/notLogged.html" }
              }
            }
            return response;
        }
        if (request.uri.substr(3,1) != '/' && headers['cloudfront-viewer-country']) {
          var countryCode = headers['cloudfront-viewer-country'].value.toLowerCase();
          var response = {
              statusCode: 302,
              statusDescription: 'Found',
              headers: {
                "location": { "value": '/' + (["fr","es"].includes(countryCode) ? countryCode : "en") + request.uri }
              }
            }
          return response;
        }
    }

    return request;
}