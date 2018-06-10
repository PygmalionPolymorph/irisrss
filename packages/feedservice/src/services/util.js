function htmlEscape(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/\//g, '&#x2F;')
    .replace(/>/g, '&gt;');
}

function htmlUnescape(str) {
  return str
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace('&#x2F;', /\//g)
    .replace(/&amp;/g, '&');
}

module.exports = {
  htmlEscape,
  htmlUnescape
};

