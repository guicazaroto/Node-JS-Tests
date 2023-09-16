const request = require('supertest');
const server = require('./server');
const mongoose = require('mongoose');
let app = null

describe('Testes da API', () => {
  beforeAll(() => {
    app = server.listen(4000); 
  });

  afterAll(() => {
    app.close(); 
    mongoose.connection.close();
  });


  it('Deve criar um novo usuário', async () => {
    const fakeUser = {
      name: 'my_name',
      email: 'my_email@test.com',
      password: 'my_password'
    }
    
    const response = await request(app)
      .post('/users')
      .send(fakeUser)

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(fakeUser.name);
    expect(response.body.email).toBe(fakeUser.email);
    expect(response.body.password).toBe(fakeUser.password);
  });

  it('Deve retornar todos os usuários cadastrados', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
  });


  it('Deve atualizar o usuário', async () => {
    const users = await request(app).get('/users');
    const {id } = users.body[0];

    const response = await request(app)
      .put(`/users/${id}`).send({ name: 'new name' });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('new name');
  })

  it('Deve excluir o usuário', async () => {
    const users = await request(app).get('/users');
    const {id } = users.body[0];

    const response = await request(app).delete(`/users/${id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Usuário excluído com sucesso');
    
    const user = await request(app).get('/users/' + id);
    expect(user.status).toBe(404);
    expect(user.body.message).toBe('Usuário não encontrado');
  })
})
