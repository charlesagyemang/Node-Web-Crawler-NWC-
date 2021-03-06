import HTTPStatus from 'http-status';
import { sanitizeDomain, convertRegexStringArrayToRegexArray, crawlAndMatchRegAndReturnAFile } from '../../helpers/app_helpers';

export const matchLinksAgainstRegexGiven = async (req, res) => {
  try {
    // sanitize url
    const sanitizedDomain = await sanitizeDomain(req.body.domain);

    // sanitize string passed regexes
    const sanitizedRegexes = await convertRegexStringArrayToRegexArray(req.body.regexes);

    await crawlAndMatchRegAndReturnAFile(sanitizedRegexes, sanitizedDomain, req.body.domain.split('://')[0], req.body.numLevels);

    res.status(HTTPStatus.OK).json({
      message: 'Success!! Check Your Root Folder And Look For A File Called matchResults.com and navigate to index.ndjson. Thats Your result File',
      dom: sanitizedDomain,
    });
  } catch (e) {
    console.log(e);
  }
};

export const pingRoute = async (req, res) => {
  try {
    res.status(HTTPStatus.OK).json({ message: 'Heyy Me That I Am Model Crawl' });
  } catch (e) {
    console.log(e);
  }
};
