import { Router } from 'express';
import SessionsUsersController from '../app/controllers/SessionsUsersController';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const sessionsUsersController = new SessionsUsersController();
  const { user, token } = await sessionsUsersController.store({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
