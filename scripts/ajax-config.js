/*
  If the url is to Parse, add the Parse headers
*/

$.ajaxPrefilter(function(options, originalOptions, jqXHR){
  if(options.url.match(/api.parse.com/)){
    options.headers = options.headers || {};
    options.headers['X-Parse-Application-Id'] = 'AUpiP6S97x8Tp9gLI9pC8QQozunO7bPUGucCok9A';
    options.headers['X-Parse-REST-API-Key'] = '8QfMgJZAZChRKUmDGMftNqGYVz4FfAPifZRslCiP';
  }
});
