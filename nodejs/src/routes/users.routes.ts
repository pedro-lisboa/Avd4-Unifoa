import { Router } from 'express';
import { getRepository } from 'typeorm';

import Users from '../app/models/Users';
import UsersController from '../app/controllers/UsersController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const usersController = new UsersController();

  const user = await usersController.store({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.get('/', ensureAuthenticated, async (request, response) => {
  const usersRepository = getRepository(Users);
  const users = await usersRepository.find();

  users.forEach(user => {
    delete user.password;
  });
  // console.log(request.user);
  return response.json(users);
});

usersRouter.get('/:id', ensureAuthenticated, async (request, response) => {
  const usersRepository = getRepository(Users);
  const { id } = request.params;

  const user = await usersRepository.findOne(id);

  delete user?.password;

  return response.json(user);
});

usersRouter.delete('/:id', ensureAuthenticated, async (request, response) => {
  const usersRepository = getRepository(Users);
  const { id } = request.params;

  await usersRepository.delete(id);

  return response.send();
});

export default usersRouter;
