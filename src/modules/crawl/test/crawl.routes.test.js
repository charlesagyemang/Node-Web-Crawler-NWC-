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
});
