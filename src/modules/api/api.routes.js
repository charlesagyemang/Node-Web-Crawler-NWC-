import { Router } from 'express';
import { version } from '../../../package.json';
import CrawlRouter from '../crawl/crawl.routes';


// Declare Router
const apiRouter = Router();

// get version number of  the api
apiRouter.get('/', (req, res) => {
  res.json({ version });
});

// Plug module routers
apiRouter.use('/crawl', CrawlRouter);


export default apiRouter;
