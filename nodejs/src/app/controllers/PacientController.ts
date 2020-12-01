import { getRepository } from 'typeorm';
import isUUID, { v4 } from 'is-uuid';

import Pacient from '../models/Pacients';
import AppError from '../../errors/AppError';

interface Request {
  name: string;
}

interface RemoveRequest {
  id: string;
}

class PacientsController {
  public async store({ name }: Request): Promise<Pacient> {
    const pacientsRepository = getRepository(Pacient);

    const checkPacientExist = await pacientsRepository.findOne({
      where: { name },
    });

    if (checkPacientExist) {
      throw new AppError('Nome já cadastrado.');
    }

    const pacient = pacientsRepository.create({
      name,
    });

    await pacientsRepository.save(pacient);

    return pacient;
  }
  
  public async getAll(): Promise<Pacient[]> {
    const pacientsRepository = getRepository(Pacient);

    const pacients = await pacientsRepository.find();

    if (pacients) {
      throw new AppError('Não há pacientes cadastrados.');
    }


    return pacients;
  }  

  public async remove({ id }: RemoveRequest): Promise<Pacient> {
    const pacientsRepository = getRepository(Pacient);

    if (!isUUID.v4(id)) {
      throw new AppError('O agendamento não existe.');
    }

    const pacient = await pacientsRepository.findOne(id);

    if (!pacient) {
      throw new AppError('O agendamento não existe.');
    }

    await pacientsRepository.delete(id);
    return pacient;
  }
}

export default PacientsController;
