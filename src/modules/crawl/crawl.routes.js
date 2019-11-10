import { Router } from 'express';
import validate from 'express-validation';
import * as c from './crawl.controller';
import v from './crawl.validation';

const CrawlRouter = Router();

CrawlRouter.post('/', validate(v.crawlData), c.crawlSite);
CrawlRouter.post('/Match.trueRegexLinks', validate(v.matchRegexBody), c.matchLinksAgainstRegexGiven);
CrawlRouter.get('/ping', c.pingRoute);


export default CrawlRouter;
