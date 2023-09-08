const request = require('supertest');
const app = require('./server');

describe('Testes da API', () => {
  beforeAll(() => {
    app.listen(3000); 
  });

  afterAll((done) => {
    app.close(done); 
  });


  it('Deve retornar um status 200 para a rota GET /', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
  });
})
