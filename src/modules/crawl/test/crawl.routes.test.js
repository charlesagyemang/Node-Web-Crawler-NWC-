import HTTPStatus from 'http-status';
import request from 'supertest-as-promised';
import server from '../../../server';

describe('Crowl::Routes', async () => {
  it('Should Ping Crawl Routes Successfully', async () => {
    const res = await request(server).get('/api/crawl/ping');

    expect(res.statusCode).toBe(HTTPStatus.OK);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Heyy Me That I Am Model Crawl');
  });

  it('Should Return 401 Badrequest if field or datatype expected is wrong', async () => {
    const res = await request(server).post('/api/crawl/Match.trueRegexLinks/').send({
      domain: 'https://www.pianoafrikonline.com',
      regexe: [
        '',
        '/book-us/',
        'contact/',
        '/courses',
        'faq',
        '/terms-and-conditions/',
      ],
      numLevels: 3,
    });

    expect(res.statusCode).toBe(HTTPStatus.BAD_REQUEST);
    expect(res.body.name).toBe('ValidationError');
  });

  it('Should Return 200 Ok if body passed passes validation', async () => {
    const res = await request(server).post('/api/crawl/Match.trueRegexLinks/').send({
      domain: 'https://www.pianoafrikonline.com',
      regexes: [
        '/a/',
        '/o/',
        '/p/',
        '/z/',
      ],
      numLevels: 3,
    });

    expect(res.statusCode).toBe(HTTPStatus.OK);
  });

  it.only('Should Crawl Site And Create A File In The Application Root Called matchResults', async () => {
    const res = await request(server).post('/api/crawl/Match.trueRegexLinks/').send({
      domain: 'https://www.pianoafrikonline.com',
      regexes: [
        '/a/',
        '/o/',
        '/p/',
      ],
      numLevels: 3,
    });

    expect(res.statusCode).toBe(HTTPStatus.OK);
    expect(res.body.message).toBe('Success!! Check Your Root Folder And Look For A File Called matchResults.com and navigate to index.ndjson. Thats Your result File');
  }, 100000);
});
