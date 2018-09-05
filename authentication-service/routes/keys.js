var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/public', function(req, res, next) {
  const key = fs.readFileSync('./config/id_rsa.pub.pem').toString();
  res.send({
    public_key: key
  });
});

module.exports = router;
