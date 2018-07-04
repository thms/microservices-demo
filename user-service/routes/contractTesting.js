const express = require('express');
const router = express.Router();
const db = require('../models/index');


/* POST /state */
/* creates the state for the contract test from the name of the test */
router.post('/state', function(req, res, next) {
  if (req.body.state == 'There is a user with email mike@example.com') {
    // create user in the database (in case he alerady exists, overwrite him)
    user = {
        "id": 1,
        "name": "mike",
        "email": "mike@example.com",
        "created_at": "2018-06-21T16:35:01.000Z",
        "updated_at": null
    }
    db.user.destroy({where: {id: user.id}}).then(result => {
      db.user.create(user).then(user => {
        res.json({status: 'ok'});
        res.end()
      })
    })
  }
});

module.exports = router;
