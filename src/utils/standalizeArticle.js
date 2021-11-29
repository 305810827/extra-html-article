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
  parser.write(`<div class="TRS_UEDITOR TRS_WEB">
  <div class="img_wrapper">
   <img src="./W020200830011894747757.jpg" alt="" appendix="true" picname="" title="" oldsrc="W020200830011894747757.jpg">
   <span class="img_descr"></span>
  </div> 
  <div class="img_wrapper">
   <img src="./W020200830011894785102.gif" alt="" appendix="true" picname="" title="" oldsrc="W020200830011894785102.gif">
   <span class="img_descr"></span>
  </div> 
  <div class="img_wrapper">
   <img src="./W020200830011894843844.png" alt="" appendix="true" picname="" title="" oldsrc="W020200830011894843844.png">
   <span class="img_descr"></span>
  </div> 
  <p>　　<strong>喂</strong></p> 
  <p>　　<strong>我是公安局的</strong> 医保局</p> 
  <p>　　<strong>通管局 检察院的</strong></p> 
  <p style="text-align: right;">　　<strong>你涉嫌</strong><strong>藏毒</strong><strong> </strong><strong> 洗黑钱 </strong></p> 
  <p>　　<strong>你的通缉令 拘捕令</strong></p> 
  <p>　　不要泄密 按我说的去做</p> 
  <p style="text-align: left;">　　冒充“公检法”诈骗，是目前较为高发的诈骗类型之一。此类案件利用受害人急于证明自己清白洗脱嫌疑的心理来进行诈骗，受害人上当受骗后，一般损失数额都比较巨大，是一种性质恶劣、危害程度较大的诈骗犯罪！</p> 
  <div class="img_wrapper">
   <img src="./W020200830011894875457.gif" alt="" appendix="true" picname="" title="" oldsrc="W020200830011894875457.gif">
   <span class="img_descr"></span>
  </div> 
  <p>　　<strong>“警察”主动找上门？</strong></p> 
  <p>　　<strong>看</strong><strong>蓟州姐姐</strong><strong>如何接招！</strong></p> 
  <!--mce-plugin-videoList2[{"listPlay":false,"videos":[{"title":"\u201c\u8b66\u5bdf\u201d\u4e3b\u52a8\u627e\u4e0a\u95e8\uff1f\u770b\u84df\u5dde\u59d0\u59d0\u5982\u4f55\u63a5\u62db\uff01","videoid":"337509743","ad":false,"source":"","url":"","img":"http://p.ivideo.sina.com.cn/video/337/509/743/337509743_400_300.jpg","largeImg":"http://p.ivideo.sina.com.cn/video/337/509/743/337509743_400_300.jpg","smallImg":"http://p.ivideo.sina.com.cn/video/337/509/743/337509743_400_300.jpg","tags":""}],"downloadDescr":"","videoCard":false}]mce-plugin-videoList2--> 
  <p> </p> 
  <p>　　（蓟州公安原创视频）</p> 
  <p>　　<strong>视频看完了<br></strong></p> 
  <p>　　<strong>我们一定要</strong></p> 
  <p>　　<strong>从此案件中吸取教训</strong></p> 
  <p>　　<strong>引以为戒</strong></p> 
  <p>　　<strong>避免类似诈骗</strong></p> 
  <p>　　<strong>发生在我们的身边</strong></p> 
  <div class="img_wrapper">
   <img src="./W020200830011894918300.png" alt="" appendix="true" picname="" title="" oldsrc="W020200830011894918300.png">
   <span class="img_descr"></span>
  </div> 
  <p style="text-align: left;">　　诈骗套路千万条，条条不离你钱包。“骗保”、“非法入境”、“拐卖儿童”、“洗黑钱”，还有结合疫情的“非法贩卖口罩”……骗子给我们安的罪名五花八门，但套路还是那熟悉的套路，冒充公检法人员打电话（软件改号）→声称转某地公安局民警接听（实际是犯罪分子的电话）→加QQ等→出示警官证（PS相片）、通缉令（伪造）→恐吓威助、洗脑→假装要求视频做笔录→要求将钱转到指定账户。</p> 
  <p>　　<strong>记住了！</strong><strong>凡提到这几句话的都是冒</strong><strong>充“公检法”诈骗！</strong></p> 
  <p>　　<strong>一</strong></p> 
  <p>　　<strong>要求你绝对不能挂掉，并为你转接电话的</strong></p> 
  <p>　　<strong>没有谁有权利让某人绝对不能挂电话，转接的电话通常都是串通好的另一个骗子的电话。</strong></p> 
  <p>　　<strong>二</strong></p> 
  <p>　　<strong>要求你必须开通网银或者重新办一张银行卡的</strong></p> 
  <p>　　<strong>同样，没有人会强制性要求你去办某一张银行卡，遇到此类情况，请千万不要去所谓的网站上透露自己的银行卡信息。</strong></p> 
  <p>　　<strong>三</strong></p> 
  <p>　　<strong>要求你绝对不能和别人（尤其是警察）透露通话内容的</strong></p> 
  <p>　　<strong>警察蜀黍是最能帮你的人，如果连警察蜀黍都不能知道的事，那这件事肯定是坏事，就是骗子正在对你做的这件坏事！</strong></p> 
  <p>　　<strong>四</strong></p> 
  <p style="text-align: left;">　　<strong>要求你先找一个隐蔽的地方和他继续通话的</strong></p> 
  <p>　　<strong>如果是警察蜀黍给你打电话，绝对不可能会有此类要求，找隐蔽的地方只是方便骗子行骗，以免被人“多管闲事”，提醒了受害人。</strong></p> 
  <p>　　<strong>五</strong></p> 
  <p>　　<strong>要求加你QQ、微信等各种社交软件，说有你的通缉令和逮捕令的</strong></p> 
  <p>　　<strong>PS是一大神器，PS是一大神器，PS是一大神器，重要的事情要说三遍。</strong></p> 
  <p>　　<strong>六</strong></p> 
  <p>　　<strong>要求你接收一下你的法律文书或者点击陌生链接、扫取陌生二维码的</strong></p> 
  <p>　　<strong>法律文书是不可能通过网络发给你的，如果你没犯法，那更不可能会有所谓的文书，请千万不要点击陌生链接。</strong></p> 
  <p>　　<strong>七</strong></p> 
  <p>　　<strong>信誓旦旦的说要你去114查询号码，但又不让你主动拨打该号码的</strong></p> 
  <p>　　<strong>现在有个东西叫作“改号软件”，它能把正确的号码覆盖在错误的号码上，因此你手机上显示的号码会是某部门正确的电话，但他真正的号码绝对不是你手机上显示的这个</strong><strong>。</strong></p> 
  <p>　　<strong>八</strong></p> 
  <p>　　<strong>要查你银行账户，又要你将钱转入“安全账户”的</strong></p> 
  <p>　　<strong>警察蜀黍是不会无缘无故来查你的钱的！即使查，也不可能通过所谓的“安全账户”来查！这个“安全账户”是完全不存在的！</strong></p> 
  <p style="text-align: right;">来源：平安天津</p>
 </div>`)
  console.log(readability.getText());
  const $ = cheerio.load(readability.getText() || htmlArticle, {
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
