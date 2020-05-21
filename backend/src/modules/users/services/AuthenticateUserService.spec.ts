import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to create a new session', async () => {
    const user = await fakeUserRepository.create({
      name: 'Donovan Pechetti',
      email: 'dovi_pf@hotmail.com',
      password: '123123',
    });

    const session = await authenticateUser.execute({
      email: 'dovi_pf@hotmail.com',
      password: '123123',
    });

    expect(session).toHaveProperty('token');
    expect(session.user).toEqual(user);
  });

  it('Should not be able to authenticate with a non-existent username', async () => {
    await expect(
      authenticateUser.execute({
        email: 'dovi_pf@hotmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with the wrong password', async () => {
    await fakeUserRepository.create({
      name: 'Donovan Pechetti',
      email: 'dovi_pf@hotmail.com',
      password: '123123',
    });

    await expect(
      authenticateUser.execute({
        email: 'dovi_pf@hotmail.com',
        password: 'xxxxxx',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
