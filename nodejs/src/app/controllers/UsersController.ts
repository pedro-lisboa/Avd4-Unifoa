import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Users from '../models/Users';
import AppError from '../../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class UsersController {
  public async store({ name, email, password }: Request): Promise<Users> {
    const usersRepository = getRepository(Users);

    const checkUserExist = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExist) {
      throw new AppError('Endereço de email já cadastrado.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default UsersController;
