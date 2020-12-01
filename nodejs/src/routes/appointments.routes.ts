import { Router } from 'express';
import { AdvancedConsoleLogger, getRepository } from 'typeorm';
import multer from 'multer';

import Appointments from '../app/models/Appointments';
import AppointmentsController from '../app/controllers/AppointmentsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import Doctors from '../app/models/Doctors';
import Pacients from '../app/models/Pacients';

const appointmentsRouter = Router();
//const upload = multer(uploadConfig);

appointmentsRouter.post(
  '/',
  ensureAuthenticated,
  //upload.single('photo'),
  async (request, response) => {
    //const userLoggedId = request.user.id;
    const { doctor_id, pacient_id, date } = request.body;
    //const { filename } = request.file;
    const appointmentsController = new AppointmentsController();

    // console.log(request.body);
    // console.log(request.file);

    const appointment = await appointmentsController.store({
      doctor_id,
      pacient_id,
      date,
    });

    return response.json(appointment);
  },
);

appointmentsRouter.put(
  '/:id',
  ensureAuthenticated,
  //upload.single('photo'),
  async (request, response) => {
    //const userLoggedId = request.user.id;
    const { id, doctor_id, pacient_id, date } = request.body;
    //const { filename } = request.file;
    const appointmentsController = new AppointmentsController();

    // console.log(request.body);
    // console.log(request.file);

    const appointment = await appointmentsController.update({
      id,
      doctor_id,
      pacient_id,
      date,
    });

    return response.json(appointment);
  },
);

appointmentsRouter.get('/', ensureAuthenticated, async (request, response) => {
  const appointmentsRepository = getRepository(Appointments);
  const doctorsRepository = getRepository(Doctors);
  const pacientsRepository = getRepository(Pacients);

  const appointments =  await (await appointmentsRepository.find({ order: { created_at: 'DESC' } }));

  const anAsyncFunction = async (item: Appointments )=> {
    const doctor = await doctorsRepository.findOne(item.doctor_id);
    const pacient = await pacientsRepository.findOne(item.pacient_id);

    return {item, doctor, pacient};
  }

  const getData = async () => {
    return Promise.all(appointments.map(item => anAsyncFunction(item)))
  }

  getData().then(data => {
    return response.json(data);
  })
});

appointmentsRouter.get('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const appointmentsRepository = getRepository(Appointments);
  const doctorsRepository = getRepository(Doctors);
  const pacientsRepository = getRepository(Pacients);

  const appointments =  await (await appointmentsRepository.find({ order: { created_at: 'DESC' } }));

  const anAsyncFunction = async (item: Appointments )=> {
    const doctor = await doctorsRepository.findOne(item.doctor_id);
    const pacient = await pacientsRepository.findOne(item.pacient_id);

    return {item, doctor, pacient};
  }

  const getData = async () => {
    return Promise.all(appointments.map(item => anAsyncFunction(item)))
  }

  getData().then(data => {
    return response.json(data.find(element => element.item.id = id));
  })
});

appointmentsRouter.delete('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  //const user_id = request.user.id;

  const appointmentsController = new AppointmentsController();

  const appointmentRemoved = await appointmentsController.remove({
    id,
  });
  console.log(appointmentRemoved);
  return response.json(appointmentRemoved);
});

export default appointmentsRouter;
