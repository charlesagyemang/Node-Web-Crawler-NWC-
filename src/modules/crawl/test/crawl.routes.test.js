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

  it('Should Return 400 Since RequestBody Doesnt Pass Validation', async () => {
    const res = await request(server).post('/api/crawl/').send({
      domain: 'https://pianoafrikonline.com',
      regex: ['/koobi/', 'post'],
      numLevels: 3,
    });


    expect(res.statusCode).toBe(HTTPStatus.BAD_REQUEST);
    expect(res.body.name).toBe('ValidationError');
    expect(res.body.errors[0].field).toBe('regexes');
  });

  it('Should Return 200 Ok Since RequestBody Conforms To Expectation', async () => {
    const res = await request(server).post('/api/crawl/').send({
      domain: 'https://pianoafrikonline.com',
      regexes: ['/koobi/', 'post'],
      numLevels: 3,
    });

    expect(res.statusCode).toBe(HTTPStatus.OK);
  });

  it('Should Sanitize Regexes To Conform With App\'s Format', async () => {
    const res = await request(server).post('/api/crawl/').send({
      domain: 'https://pianoafrikonline.com',
      regexes: ['/koobi/', 'post'],
      numLevels: 3,
    });

    console.log(res.body);
    // expect(res.statusCode).toBe(HTTPStatus.OK);
    // expect(res.body).toHaveProperty('message');
  });
});
