const express = require('express');
const Handlebars = require('handlebars');
const MarkdownPDF = require('markdown-pdf')();
const Joi = require('joi');
const router = express.Router();
const fs = require('fs')

const documentParamsSchema = Joi.object({
  template: Joi.string().required(),
  data: Joi.object().required()
});

/* POST /documents */
/* generates a new document and returns it. does not store it */
/* Expects both template and data to be provide */
router.post('/', function(req, res, next) {
  const validation = Joi.validate(req.body, documentParamsSchema, {
  // return an error if body has an unrecognised property
    allowUnknown: true,
    // return only first error a payload contains
    abortEarly: true
  });

  if (validation.error) {
    console.log(validation.error)
    res.status(400);
    res.json(validation.error.details[0]);
  } else {
    let template = req.body.template
    // handlebars replacement
    let document = Handlebars.compile(template)(req.body.data)
    if (req.headers['accept'] == 'application/md') {
      res.status(201)
      res.type('application/md');
      res.send(document)
    } else {
      // markdown to pdf conversion:
      MarkdownPDF.from.string(document).to.buffer(function (err, pdf) {
        res.status(201);
        res.type('application/pdf; charset=utf-8');
        res.send(pdf);
        fs.writeFile('./termsheet.pdf', pdf)
      });
    }
  }
});


module.exports = router;
