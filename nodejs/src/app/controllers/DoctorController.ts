import { getRepository } from 'typeorm';
import isUUID, { v4 } from 'is-uuid';

import Doctors from '../models/Doctors';
import AppError from '../../errors/AppError';

interface Request {
  name: string;
  specialty: string;
}

interface RemoveRequest {
  id: string;
}

class DoctorsController {
  public async store({ name, specialty }: Request): Promise<Doctors> {
    const doctorsRepository = getRepository(Doctors);

    const checkDoctorExist = await doctorsRepository.findOne({
      where: { name, specialty },
    });

    if (checkDoctorExist) {
      throw new AppError('Já existe um medico com essa especialidade e nome cadastrado.');
    }

    const doctor = doctorsRepository.create({
      name,
      specialty,
    });

    await doctorsRepository.save(doctor);

    return doctor;
  }
  
  public async getAll(): Promise<Doctors[]> {
    const doctorsRepository = getRepository(Doctors);

    const doctors = await doctorsRepository.find();

    if (doctors) {
      throw new AppError('Não há doctores cadastrados.');
    }

    return doctors;
  }

  public async remove({ id }: RemoveRequest): Promise<Doctors> {
    const doctorsRepository = getRepository(Doctors);

    if (!isUUID.v4(id)) {
      throw new AppError('O doutor não existe.');
    }

    const doctor = await doctorsRepository.findOne(id);

    if (!doctor) {
      throw new AppError('O doutor não existe.');
    }

    await doctorsRepository.delete(id);
    return doctor;
  }
}

export default DoctorsController;
