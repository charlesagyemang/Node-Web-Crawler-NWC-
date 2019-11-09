import url from 'url';
import fs from 'fs';
import Crawler from 'node-html-crawler';


export const sanitizeDomain = (domain) => {
  let newDomain = domain.split('//')[1].split('www.');
  newDomain = newDomain[newDomain.length - 1];
  return newDomain;
};

export const sanitizeRegexField = (regexArray) => {
  const sanitizedRegexes = [];
  regexArray.forEach((regex) => {
    const divide = regex.split('/');
    if (divide.length === 2) {
      if (divide[0].length > 1) {
        sanitizedRegexes.push(`/${divide[0]}/`);
        return;
      }
      sanitizedRegexes.push(`/${divide[1]}/`);
      return;
    }

    if (divide.length === 1) {
      if (divide[0] === '') {
        sanitizedRegexes.push('');
        return;
      }
      sanitizedRegexes.push(`/${divide[0]}/`);
      return;
    }

    sanitizedRegexes.push(regex);
  });
  return sanitizedRegexes;
};


export const save = async (urlString, data) => {
  if (!urlString || !data) return false;
  const urlObject = url.parse(urlString);
  const pathArray = urlObject.pathname.split('/');
  let path = `${urlString.split('://')[1]}`;

  if (!fs.existsSync(path)) fs.mkdirSync(path);

  for (let i = 1; i < pathArray.length; i++) {
    if (i !== pathArray.length - 1) {
      path = `${path}${pathArray[i]}`;
      if (!fs.existsSync(path)) fs.mkdirSync(path);
    } else {
      path = (pathArray[i]) ? `${path}/${pathArray[i].replace(/\.html?$/, '')}` : `${path}index`;
      fs.writeFileSync(`${path}.json`, data);
      fs.writeFileSync(`${path}.ndjson`, data);
    }
  }

  return true;
};


export const crawlSiteAdvance = async (regexes, scrapeUrl) => {
  try {
    const crl = new Crawler(scrapeUrl);
    crl.crawl();

    let mesophyll = '';

    crl.on('data', (data) => {
      if (data.result.statusCode === 200) {
        const validUrlExtention = data.url.split('.com/')[1];
        if (regexes.includes(`/${validUrlExtention}`) || validUrlExtention === '') {
          if (validUrlExtention === '') {
            mesophyll += `\n${JSON.stringify({ root: data.result.body })}`;
          } else {
            const obj = {};
            obj[`${validUrlExtention.split('/')[0]}`] = data.result.body;
            mesophyll += `\n${JSON.stringify(obj)}`;
          }
          save('https://crawlResults.com/', mesophyll);
        }
      }
    });

    crl.on('error', (error) => {
      console.log(error);
    });

    crl.on('end', () => {
      console.log('end');
    });
  } catch (e) {
    console.log(e);
  }
};
