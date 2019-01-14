// During the test the env variable is set to test
process.env.NODE_ENV = 'test';
process.env.PORT = '3000';

// Require the dev-dependencies
const chai = require('chai');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const should = chai.should();
const showdown  = require('showdown');
const puppeteer = require('puppeteer');

// Our parent block
describe('Puppeteer', () => {
  /*
  * Happy path for document generation
  */

  describe('pdf generation', () => {

      const template = fs.readFileSync('./test/templates/termsheet.md').toString()
      const converter = new showdown.Converter();
      const html      = converter.makeHtml(template);
    it('it should create pdf with header and footer', (done) => {
      (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html)
        await page.pdf({
          path: 'termsheet.pdf',
          format: 'A4',
          displayHeaderFooter: true,
          headerTemplate: '<div style="font-size:12px;margin:0 80px;">ASTO Digital Ltd. <span class="date"></span></div>',
          footerTemplate: '<div style="font-size:12px;margin:0 80px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
          margin: {
            top: '100px',
            bottom: '100px',
            left: '100px',
            right: '100px'
          }
        });
        await browser.close();
        done();
      })();
    })
  });

});
