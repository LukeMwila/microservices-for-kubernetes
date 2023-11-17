const { expect } = require('chai');
const { agent } = require('supertest');
const app = require('../app');

const request = agent;

describe('Products controller', () => {
  it('Get request to /v1/products returns array of products', async () => {
    const res = await request(app).get('/v1/products');
    const bodyResponse = res.body;
    expect(bodyResponse).to.be.an('array');
    expect(res.status).to.equal(200);
  });
});