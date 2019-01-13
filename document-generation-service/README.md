# Document generation service
## Purpose
combine a template and a data object to a final document to be rendered as html, pdf or something else

## Mechanism
templates use
- markdown for formatting
- handlebars for variables
- markdown to pdf for conversion (creates html thn uses phantom js to create the pdf)

so the processing pipeline looks like this
template.md + data.json -> handlebars --> document.md -> markdown2pdf -> document.pdf

templates are stored on contentful
data definitions are stored in contentful so we have:
template.variables and template.markdown


documents can be previewed
documents can be validated with the supplied data


## Open questions
how do we define what data a version of a template needs, more specifically, where do we define that?
--> probably in contentful
--> then the question is how does that part of our system know what data is available - oh screw that

how do we call the service? Options?
- POST /documents.pdf body: data.json + template.md
--> service nows nothing of the outside world, has no data store, nice
--> some other service needs to orchestrate getting the right template, the data and so on


- POST /documents.pdf?template_id=123&object_id=123&object_type=loan
--> streams back the content as application/pdf
--> service needs to know where to find templates and data and other stuff, not really nice, tightly coupled.

--> Lets build the first one first, we can layer the second version on top of it.

## Page formatting
header, footer
markdown does not have support for those, but phantomjs does.
--> runnings.js
let MarkdownPDF = require('markdown-pdf')({runningsPath: './test/templates/runnings.js'})
MarkdownPDF.from('./test/templates/termsheet.md').to('termsheet.pdf')



## Known issues
rendering is slow, about six seconds --> potentially run phantom as a server to make this faster?
--> should help since the package fires up a separate child process to run phantmjs, whic incurs quite some overhead


## Progress
This works:
const MarkdownPDF = require('markdown-pdf')()
MarkdownPDF.from('./test/templates/termsheet.md').to('termsheet.pdf')

From string, works
const MarkdownPDF = require('markdown-pdf')()
const fs = require('fs')
let template = fs.readFileSync('./test/templates/termsheet.md').toString()
MarkdownPDF.from.string(template).to('termsheet.pdf')

To buffer, works too
const MarkdownPDF = require('markdown-pdf')()
const fs = require('fs')
let template = fs.readFileSync('./test/templates/termsheet.md').toString()
MarkdownPDF.from.string(template).to.buffer(function (err, document) { console.log(document)})
MarkdownPDF.from.string(template).to.buffer(function (err, document) { fs.writeFile('test.pdf', document)})

Validating pdf generated, by parsing text and looking for text replacements
const MarkdownPDF = require('markdown-pdf')()
const pdfParse = require('pdf-parse')
let document = fs.readFileSync('./termsheet.pdf')
pdfParse(document).then(data => {
  console.log(data.text)
}).catch(err => console.log(err))

Markdown replacement with handlebars
const Handlebars = require('handlebars')
const fs = require('fs')
let template = fs.readFileSync('./test/templates/termsheet.md').toString()
let t = Handlebars.compile(template)


## Alternative with showdown and puppeteer
const showdown  = require('showdown')
const fs = require('fs')
let converter = new showdown.Converter()
let template = fs.readFileSync('./test/templates/termsheet.md').toString()
let html      = converter.makeHtml(template)
fs.writeFile('./termsheet.html', html)

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
  await page.setContent(html)
  await page.pdf({path: 'termsheet.pdf', format: 'A4'});

  await browser.close();
})();
