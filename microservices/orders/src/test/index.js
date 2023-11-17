const { expect } = require('chai');
const { agent } = require('supertest');
const app = require('../app');

const request = agent;

describe('Orders controller', () => {
  it('Get request to /v1/orders returns array of orders', async () => {
    const res = await request(app).get('/v1/orders');
    const bodyResponse = res.body;
    expect(bodyResponse).to.be.an('array');
    expect(res.status).to.equal(200);
  });
});