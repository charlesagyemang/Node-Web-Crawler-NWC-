import HTTPStatus from 'http-status';
import { sanitizeRegexField } from '../../helpers/test_helpers';

export const crawlSite = async (req, res) => {
  try {
    const regexArray = req.body.regexes;

    const sanitizedRegexes = await sanitizeRegexField(regexArray);

    res.status(HTTPStatus.OK).json({
      message: 'Heyy Me That I Am Model Crawl',
      reg: sanitizedRegexes,
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
