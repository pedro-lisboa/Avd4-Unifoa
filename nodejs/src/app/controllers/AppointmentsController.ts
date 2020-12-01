import isUUID, { v4 } from 'is-uuid';
import { getRepository } from 'typeorm';

import Appointments from '../models/Appointments';
import AppError from '../../errors/AppError';

interface Request {
  doctor_id: string;
  pacient_id: string;
  date: Date;
}

interface UpdateRequest {
  id: string;
  doctor_id: string;
  pacient_id: string;
  date: Date;
}

interface RemoveRequest {
  id: string;
}

class AppointmentsController {
  public async store({
    doctor_id,
    pacient_id,
    date,
  }: Request): Promise<Appointments> {
    const appointmentsRepository = getRepository(Appointments);

    const appointment = appointmentsRepository.create({
      doctor_id,
      pacient_id,
      date,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }

  public async remove({ id }: RemoveRequest): Promise<Appointments> {
    const appointmentsRepository = getRepository(Appointments);

    if (!isUUID.v4(id)) {
      throw new AppError('O agendamento não existe.');
    }

    const appointment = await appointmentsRepository.findOne(id);

    if (!appointment) {
      throw new AppError('O agendamento não existe.');
    }

    await appointmentsRepository.delete(id);
    return appointment;
  }

  public async update({
    id,
    doctor_id,
    pacient_id,
    date,
  }: UpdateRequest): Promise<Appointments | undefined> {
    const appointmentsRepository = getRepository(Appointments);


    const appointmentResult = await appointmentsRepository.update( id, {
      doctor_id,
      pacient_id,
      date,
      updated_at: Date.now(),
    });

    const appointment = await appointmentsRepository.findOne({ id })

    return appointment;
  }
}

export default AppointmentsController;
