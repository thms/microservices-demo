// Defines the header of footer functions for phantomjs
// This is processed after the markdown to html conversion, so it needes to be Javascript and return final HTML
exports.header =
{
  height: "1cm",
  contents: function(pageNum, numPages) {
    return "<div>Header <span style='float:right'>" + pageNum + " / " + numPages + "</span></div>"
  }
}


exports.footer =
{
  height: "1cm",
  contents: function(pageNum, numPages) {
    return "<div>Footer <span style='float:right'>" + pageNum + " / " + numPages + "</span></div>"
  }
}
