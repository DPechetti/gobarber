import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('Should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Donovan Pechetti',
      email: 'dovi_pf@hotmail.com',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Donovan Pechetti');
  });

  it('should not allow more than one user with the same email', async () => {
    await createUser.execute({
      name: 'Donovan Pechetti',
      email: 'dovi_pf@hotmail.com',
      password: '123123',
    });

    await expect(
      createUser.execute({
        name: 'Donovan Pechetti 2',
        email: 'dovi_pf@hotmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
