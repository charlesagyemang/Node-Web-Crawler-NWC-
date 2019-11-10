import url from 'url';
import fs from 'fs';
import Crawler from 'node-html-crawler';


const readFromArray = (regArray, givenArray) => {
  const retObj = {};
  regArray.forEach((regex) => {
    let objBody = '';

    givenArray.forEach((arr) => {
      if (regex.test(arr)) {
        objBody += `${arr}301040`;
      }
    });

    objBody = objBody.split('301040');
    objBody = objBody.splice(0, objBody.length - 1).join(',');

    retObj[`${regex}`] = objBody.split(',');
  });
  return retObj;
};

export const sanitizeDomain = (domain) => {
  let newDomain = domain.split('//')[1].split('www.');
  newDomain = newDomain[newDomain.length - 1];
  return newDomain;
};

export const convertRegexStringArrayToRegexArray = (regexArray) => {
  const returnArray = [];

  regexArray.forEach((regexString) => {
    returnArray.push(new RegExp(regexString.split('/')[1]));
  });
  // console.log(returnArray);
  return returnArray;
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
      fs.writeFileSync(`${path}.ndjson`, data);
      console.log('saved as json & ndjson', urlString);
    }
  }

  return true;
};


export const crawlAndMatchRegAndReturnAFile = async (
  regexes,
  domain,
  protocol,
  limitForRedirects) => {
  try {
    const crl = new Crawler({
      protocol: `${protocol}:`,
      domain,
      limitForRedirects,
    });

    crl.crawl();

    const linkParker = [];

    crl.on('data', async (data) => {
      if (data.result.statusCode === 200) {
        const gottenLink = data.url;
        if (!linkParker.includes(gottenLink)) linkParker.push(gottenLink);
      }

      const mappedData = await readFromArray(regexes, linkParker);
      await save('https://matchResults.com/', JSON.stringify({ result: mappedData }));
      console.log('Working.......');
    });

    crl.on('error', (error) => {
      console.log(error);
    });

    crl.on('end', async () => {
      console.log('end');
    });
    // */
  } catch (e) {
    console.log(e);
  }
};
