const express = require('express');
const Handlebars = require('handlebars');
const showdown  = require('showdown');
const puppeteer = require('puppeteer');
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
    res.status(201)
    switch(req.headers['accept']) {
      case 'text/markdown':
        res.type('text/markdown; charset=utf-8');
        res.send(document)
        break
      case 'text/html':
        let converter = new showdown.Converter()
        let html = converter.makeHtml(document)
        res.status(201)
        res.type('text/html; charset=utf-8')
        res.send(html)
        break
      case 'application/pdf':
        (async () => {
          let converter = new showdown.Converter()
          let html = converter.makeHtml(document)
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.setContent(html)
          let pdf = await page.pdf({format: 'A4'});
          res.status(201)
          res.type('application/pdf; charset=utf-8');
          await browser.close();
          res.send(pdf);
        })();
        break
      default:
      res.status(406)
    }
  }
});

module.exports = router;
