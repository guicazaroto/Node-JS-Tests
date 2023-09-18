const { index, get, create, update, destroy } = require('../controllers/UserController');
const User = require('../models/User');

jest.mock('../models/User');

const mockUsers = [
  { id: '3432423', name: 'Usuário 1', email: 'one@email.com', password: '321321312' }, 
  { id: 't44rew4325', name: 'Usuário 2', email: 'two@email.com', password: '321321312' }, 
];

describe('UserController', () => {
  it('Deve retornar uma lista de usuários', async () => {
    User.find.mockResolvedValue(mockUsers);

    const req = {}; 
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await index(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });

  it('Deve retornar um usuário por ID', async () => {
    User.findById.mockResolvedValue(mockUsers[0]);

    const req = { params: { id: 'ID_DO_USUÁRIO' } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await get(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUsers[0]);
  });

  it('Deve criar um novo usuário', async () => {
    const req = {
      body: mockUsers[0], 
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    const saveMock = jest.fn(); 
    
    User.mockImplementation(() => {
      return {
        save: saveMock.mockResolvedValue(mockUsers[0]),
      };
    });

    await create(req, res);

    expect(User).toHaveBeenCalledWith(req.body);
    expect(saveMock).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockUsers[0]);
  });


  it('Deve atualizar um usuário existente com sucesso', async () => {
    const req = {
      params: { id: 'ID_DO_USUARIO' },
      body: {
        name: 'Novo Nome',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockUser = {
      _id: 'ID_DO_USUARIO',
      name: 'Novo Nome',
    };

    User.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUser);

    await update(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      'ID_DO_USUARIO',
      req.body,
      { new: true }
    );

    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it('Deve excluir um usuário existente com sucesso', async () => {
    const req = {
      params: { id: 'ID_DO_USUARIO' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    User.findByIdAndRemove.mockResolvedValue(mockUsers[0]);

    await destroy(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(User.findByIdAndRemove).toHaveBeenCalledWith('ID_DO_USUARIO');
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuário excluído com sucesso' });
  });
  
})
  



