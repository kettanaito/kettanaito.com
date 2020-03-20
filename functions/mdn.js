const MDN_SITEMAP_URL =
  'https://developer.mozilla.org/sitemaps/en-US/sitemap.xml'

exports.handler = function(event, context, callback) {
  fetch(MDN_SITEMAP_URL)
    .then((res) => res.text())
    .then((list) => {
      callback(null, {
        body: list,
      })
    })
    .catch((error) => {
      callback(error)
    })
}
