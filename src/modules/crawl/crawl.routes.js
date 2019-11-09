import { Router } from 'express';
import validate from 'express-validation';
import * as c from './crawl.controller';
import v from './crawl.validation';

const CrawlRouter = Router();

CrawlRouter.post('/', validate(v.crawlData), c.crawlSite);
CrawlRouter.get('/ping', c.pingRoute);


export default CrawlRouter;
