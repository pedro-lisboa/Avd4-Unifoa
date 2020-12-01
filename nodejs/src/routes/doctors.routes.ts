import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import Doctors from '../app/models/Doctors';
import DoctorsController from '../app/controllers/DoctorController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const doctorsRouter = Router();
const upload = multer(uploadConfig);

doctorsRouter.post(
  '/',
  ensureAuthenticated,
  upload.single('photo'),
  async (request, response) => {
    //const userLoggedId = request.user.id;
    const { name, specialty } = request.body;
    const doctorsController = new DoctorsController();

    // console.log(request.body);
    // console.log(request.file);

    const doctor = await doctorsController.store({
      name,
      specialty,
    });

    return response.json(doctor);
  },
);

doctorsRouter.get('/', ensureAuthenticated, async (request, response) => {
  const doctorsRepository = getRepository(Doctors);
  const event = await doctorsRepository.find({ order: { created_at: 'DESC' } });

  // console.log(request.event);
  return response.json(event);
});

doctorsRouter.delete('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;

  const doctorsController = new DoctorsController();

  const doctorRemoved = await doctorsController.remove({
    id,
  });
  console.log(doctorRemoved);
  return response.json(doctorRemoved);
});

export default doctorsRouter;
