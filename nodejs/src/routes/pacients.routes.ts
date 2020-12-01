import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import Pacients from '../app/models/Pacients';
import PacientsController from '../app/controllers/PacientController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const pacientsRouter = Router();
//const upload = multer(uploadConfig);

pacientsRouter.post(
  '/',
  ensureAuthenticated,
  //upload.single('photo'),
  async (request, response) => {
    //const userLoggedId = request.user.id;
    const { name } = request.body;
    //const { filename } = request.file;
    const pacientsController = new PacientsController();

    // console.log(request.body);
    // console.log(request.file);

    const pacient = await pacientsController.store({
      name,
    });

    return response.json(pacient);
  },
);

pacientsRouter.get('/', ensureAuthenticated, async (request, response) => {
  const pacientsRepository = getRepository(Pacients);
  const pacient = await pacientsRepository.find({ order: { created_at: 'DESC' } });

  // console.log(request.pacient);
  return response.json(pacient);
});

pacientsRouter.delete('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;

  const pacientsController = new PacientsController();

  const pacientRemoved = await pacientsController.remove({
    id,
  });
  console.log(pacientRemoved);
  return response.json(pacientRemoved);
});

export default pacientsRouter;
