/**
 * Article parser
 * @ndaidong
 **/

const {
  isString,
  unique,
} = require('bellajs');

const {hasProvider, extract: extractOembed} = require('oembed-parser');

const retrieve = require('./utils/retrieve');
const isValidUrl = require('./utils/isValidUrl');
const normalizeUrl = require('./utils/normalizeUrl');
const parseFromHtml = require('./utils/parseFromHtml');

const {
  info,
} = require('./utils/logger');

const {
  setParserOptions,
  setNodeFetchOptions,
  setSanitizeHtmlOptions,
  getParserOptions,
  getNodeFetchOptions,
  getSanitizeHtmlOptions,
} = require('./config');


const extract = async (input) => {
  if (!isString(input)) {
    throw new Error('Input must be a string');
  }
  const article = {
    url: '',
    links: [],
    title: '',
    description: '',
    image: '',
    author: '',
    content: '',
    source: '',
    published: '',
    ttr: 0,
  };

  if (!isValidUrl(input)) {
    return parseFromHtml(input, []);
  }

  const trimmedUrl = input.trim();

  if (isValidUrl(trimmedUrl)) {
    const normalizedUrl = normalizeUrl(trimmedUrl);
    const links = [trimmedUrl, normalizedUrl];
    article.url = normalizedUrl;
    if (hasProvider(normalizedUrl)) {
      info('Provider found, loading as oEmbed data...');
      const json = await extractOembed(normalizedUrl);
      if (json) {
        article.title = json.title || '';
        article.content = json.html || '';
        article.author = json.author_name || '';
        article.image = json.thumbnail_url || '';
        article.source = json.provider_name || '';
        if (json.url) {
          article.url = json.url;
          links.push(json.url);
        }
        article.links = unique(links);
        return article;
      }
    }
    const res = await retrieve(normalizedUrl);
    if (!res) {
      throw new Error(`Could not retrieve content from "${normalizedUrl}"`);
    }
    const {
      html,
      url,
      resUrl,
    } = res;

    const result = parseFromHtml(html, [...links, url, resUrl]);
    if (result) {
      return result;
    }
  }
  return null;
};

extract(`<div class="TRS_UEDITOR TRS_WEB">
  <p>　　根据全国扫黑办第九次主任会议部署，公安部近日组织全国公安机关开展扫黑除恶追逃“清零”行动，助力涉黑涉恶案件侦办取得新突破，推动扫黑除恶专项斗争深入健康发展。公安部将1712名涉黑涉恶逃犯列为“清零”行动目标逃犯，逐一明确追逃责任人，实行挂账督捕，并对13名重点在逃人员发布A级通缉令。截至目前，1712名目标逃犯中，1481名境内逃犯到案635人，231名潜逃境外逃犯到案23人。公安机关正告涉黑涉恶逃犯，要认清形势，尽快投案自首，争取宽大处理。“法网恢恢、疏而不漏”，不要存在侥幸心理，否则将受到法律严惩！</p> 
  <p>　　公安部13名A级通缉令逃犯</p> 
  <p>　　1、张大利</p> 
  <div class="img_wrapper">
   <img src="./W020200830003600182694.jpg" alt="" appendix="true" picname="" title="" oldsrc="W020200830003600182694.jpg">
   <span class="img_descr"></span>
  </div> 
  <p>　　张大利，男，满族，1989年6月10日出生，身高169厘米左右，户籍地：吉林省伊通满族自治县西苇镇孤山河村三组，身份证号码：152221198906101419。</p> 
  <p>　　2、鲁呈敬</p> 
  <div class="img_wrapper">
   <img src="./W020200830003600216643.jpg" alt="" appendix="true" picname="" title="" oldsrc="W020200830003600216643.jpg">
   <span class="img_descr"></span>
  </div> 
  <p>　　鲁呈敬，男，汉族，1987年8月9日出生，身高173厘米左右，体态偏胖，户籍地：河北省邯郸市大名县黄金堤乡黄金堤四村1组40号，身份证号码：130425198708092057。</p> 
  <p>　　3、孙 宇</p> 
  <div class="img_wrapper">
   <img src="./W020200830003600247659.jpg" alt="" appendix="true" picname="" title="" oldsrc="W020200830003600247659.jpg">
   <span class="img_descr"></span>
  </div> 
  <p>　　孙宇，男，汉族，1992年9月4日出生，身高175厘米左右，户籍地：辽宁省新民市陶家屯羊草沟村234号，身份证号码：210181199209046813。</p> 
  <p>　　4、林晓光</p> 
  <div class="img_wrapper">
   <img src="./W020200830003600271258.jpg" alt="" appendix="true" picname="" title="" oldsrc="W020200830003600271258.jpg">
   <span class="img_descr"></span>
  </div> 
  <p>　　林晓光，男，汉族，1973年12月26日出生，身高170厘米左右，长条形脸，体态中等，吉林口音，户籍地：吉林省洮南市光明街七委七十三组，身份证号码：222302197312260017。</p> 
  <p>　　5、陈春友</p> 
  <div class="img_wrapper">
   <img src="./W020200830003600308021.jpg" alt="" appendix="true" picname="" title="" oldsrc="W020200830003600308021.jpg">
   <span class="img_descr"></span>
  </div> 
  <p>　　陈春友，男，汉族，1978年3月7日出生，身高172厘米左右，国字脸，体态中等，安徽口音，户籍地：安徽省阜南县王化镇富陂村大陈庄78号，身份证号码：342127197803077755。</p> 
  <p>　　6、刘严</p> 
  <div class="img_wrapper">
   <img src="./W020200830003600330063.jpg" alt="" appendix="true" picname="" title="" oldsrc="W020200830003600330063.jpg">
   <span class="img_descr"></span>
  </div> 
  <p>　　刘严，男，汉族，1989年11月11日出生，身高163厘米左右，国字脸，体态中等，江苏邳州口音 ，户籍地：江苏省邳州市车夫山镇车夫山村1176号，身份证号码：320382198911115215。</p> 
  <p>　　7、王孙爱</p> 
  <div class="img_wrapper">
   <img src="./W020200830003600363835.jpg" alt="" appendix="true" picname="" title="" oldsrc="W020200830003600363835.jpg">
   <span class="img_descr"></span>
  </div> 
  <p>　　王孙爱，男，汉族，1973年11月5日出生，身高168厘米左右，中等身材，户籍地：福建省平潭县潭城镇燕山庄136号，身份证号码：350128197311050034。</p> 
  <p>　　8、李小兵</p> 
  <div class="img_wrapper">
   <img src="./W020200830003600391441.jpg" alt="" appendix="true" picname="" title="" oldsrc="W020200830003600391441.jpg">
   <span class="img_descr"></span>
  </div> 
  <p>　　李小兵，男，汉族，1974年3月2日出生，身高170厘米左右，体态偏瘦，河南鹤壁口音，户籍地：河南省鹤壁市淇滨区九江路香江翡翠城19号楼东1单元502号，身份证号码：410611197403020058。</p> 
  <p>　　9、银和国</p> 
  <div class="img_wrapper">
   <img src="./W020200830003600422191.jpg" alt="" appendix="true" picname="" title="" oldsrc="W020200830003600422191.jpg">
   <span class="img_descr"></span>
  </div> 
  <p>　　银和国，男，汉族，1985年3月12日出生，户籍地：湖南省邵阳市洞口县黄桥镇建设社区胜利街85号，身份证号码：430525198503128630。</p> 
  <p>　　10、金彩霞</p> 
  <div class="img_wrapper">
   <img src="./W020200830003600455442.jpg" alt="" appendix="true" picname="" title="" oldsrc="W020200830003600455442.jpg">
   <span class="img_descr"></span>
  </div> 
  <p>　　金彩霞，绰号“金婉婉”，女，汉族，1998年5月14日出生，广东口音，户籍地：广东省徐闻县迈陈镇金宅村65号，身份证号码：440825199805143468。</p> 
  <p>　　11、沈武波</p> 
  <div class="img_wrapper">
   <img src="./W020200830003600481837.jpg" alt="" appendix="true" picname="" title="" oldsrc="W020200830003600481837.jpg">
   <span class="img_descr"></span>
  </div> 
  <p>　　沈武波，男，汉族，1983年1月27日出生，身高170厘米左右，中等身材，户籍地：四川省犍为县罗城镇大山村13组9号，身份证号码：511123198301273510。</p> 
  <p>　　12、谢兴贵</p> 
  <div class="img_wrapper">
   <img src="./W020200830003600519912.jpg" alt="" appendix="true" picname="" title="" oldsrc="W020200830003600519912.jpg">
   <span class="img_descr"></span>
  </div> 
  <p>　　谢兴贵，男，汉族，1974年7月2日出生，身高172厘米左右，体型较胖，户籍地：四川省犍为县罗城镇白云村8组49号，身份证号码：511123197407023814。</p> 
  <p>　　13、刘国忠</p> 
  <div class="img_wrapper">
   <img src="./W020200830003600545788.jpg" alt="" appendix="true" picname="" title="" oldsrc="W020200830003600545788.jpg">
   <span class="img_descr"></span>
  </div> 
  <p>　　刘国忠，男，汉族，1976年8月23日出生，身高175厘米左右，体态中等，户籍地：湖北省汉川市分水镇分水大道汉川三中，身份证号码：42098419760823171X。</p> 
  <p style="text-align: right;">　　来源 ：人民日报</p>
 </div>`)

module.exports = {
  setParserOptions,
  setNodeFetchOptions,
  setSanitizeHtmlOptions,
  getParserOptions,
  getNodeFetchOptions,
  getSanitizeHtmlOptions,
  extract,
};
