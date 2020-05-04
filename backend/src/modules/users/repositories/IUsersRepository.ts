import User from '@modules/users/infra/typeorm/entities/User';
import iCreateUserDto from '@modules/users/dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: iCreateUserDto): Promise<User>;
  save(user: User): Promise<User>;
}
