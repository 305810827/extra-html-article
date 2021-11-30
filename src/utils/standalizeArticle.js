// utils -> standalizeArticle

const cheerio = require('cheerio');
const sanitize = require('sanitize-html');
const {Parser} = require('htmlparser2')
const Readability = require('./element')

const {minify: htmlmin} = require('html-minifier-terser');

const absolutifyUrl = require('./absolutifyUrl');
const {getSanitizeHtmlOptions} = require('../config');


module.exports = (htmlArticle, url) => {

  const readability = new Readability()
  const parser = new Parser(readability)
  parser.write(htmlArticle)
  const $ = cheerio.load(readability.getText()?.replace(/[\s\t\n]+/g, '。')?.replace(/[.。,，！!?？:：]+。/g,'。') || htmlArticle, {
    normalizeWhitespace: true,
    decodeEntities: true,
  });

  // $('a').each((i, elem) => {
  //   const href = $(elem).attr('href');
  //   if (href) {
  //     $(elem).attr('href', absolutifyUrl(url, href));
  //     $(elem).attr('target', '_blank');
  //   }
  // });
  //
  // $('img').each((i, elem) => {
  //   const src = $(elem).attr('src');
  //   if (src) {
  //     $(elem).attr('src', absolutifyUrl(url, src));
  //   }
  // });

  const minifiedHtml = htmlmin($.text(), {
    removeComments: true,
    removeEmptyElements: true,
    removeEmptyAttributes: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    conservativeCollapse: false,
    removeTagWhitespace: true,
  });

  const cleanHtml = sanitize(minifiedHtml, getSanitizeHtmlOptions());
  return cleanHtml.trim();
};
