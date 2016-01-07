var jwt = require('jwt-simple');

var secret = process.env.TOKEN_SECRET || 'WILDCARDBOOYAHBOOYAHBOOYAH';

module.exports = {

  issueToken: function(payload){
    var token = jwt.encode(payload, secret);
    return token;
  },

  verifyToken: function(token) {
    var decoded = jwt.decode(token, secret);
    return decoded;
  },

  hasToken: function(req, res, next) {
    var token = req.headers['authorization'];
    var validToken;

    if(req.headers && token) {
      validToken = module.exports.verifyToken(token);
      console.log(!validToken);
      if(!validToken) {
        res.status(401).send();
      }
      req.token = validToken;
      next();
    } else {
      res.status(401).send();
    }
  },

  extendPayload: function(payload, newData) {
    for(var data in newData) {
      payload[data] = newData[data];
    } 
    return payload;
  }

};
