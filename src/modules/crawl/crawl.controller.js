import HTTPStatus from 'http-status';


export const crawlSite = async (req, res) => {
  try {
    res.status(HTTPStatus.OK).json({ message: 'Heyy Me That' });
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
