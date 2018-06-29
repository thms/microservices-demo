module.exports.getUser = function(username, password) {
  return({userId: 1, email: 'mike@example.com'});
}

module.exports.getClient = function *(clientId, clientSecret) {
  return {
    clientId: 1, //oAuthClient.client_id,
    clientSecret: 'sectreoftheclient', //oAuthClient.client_secret,
    grants: ['password'] // the list of OAuth2 grant types that should be allowed
  };
};

module.exports.saveAuthorizationCode = function (authorizationCode) {
  return {}
}

module.exports.getAccessToken = function(bearerToken) {
  return {
    accessToken: 'token.access_token',
    client: {id: 'token.client_id'},
    expires: 'token.expires',
    user: {id: 'token.userId'} // could be any object
  };
};
