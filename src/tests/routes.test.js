const request = require('supertest');
const server = require('../server');
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


describe('Teste de Integração', () => {

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


    it('Deve retornar um único usuário cadastrado', async () => {
        const users = await request(app).get('/users');
        const user = users.body[0];

        const firstUser = await request(app)
          .get('/users/' + user.id);
    
        expect(firstUser.status).toBe(200);
        expect(firstUser.body.name).toBe(user.name);
        expect(firstUser.body.email).toBe(user.email);
    });

    it('Deve retornar um erro 404 se o usuário não existir', async () => {
      const response = await request(app).get('/users/64fa67a5612b41047fcceb5d');
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Usuário não encontrado');
    })


    it('Deve atualizar o usuário', async () => {
      const users = await request(app).get('/users');
      const {id } = users.body[0];

      const response = await request(app)
        .put(`/users/${id}`)
        .send({ name: 'new name', email: 'newemail@email.com' });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('new name');
      expect(response.body.email).toBe('newemail@email.com');
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
})
