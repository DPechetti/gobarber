import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderService from '@modules/appointments/services/ListProviderService';

let fakeUserRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProviderService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProviderService(
      fakeUserRepository,
      fakeCacheProvider,
    );
  });

  it('Should be able to list the providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'Teste',
      email: 'teste@hotmail.com',
      password: '123123',
    });

    const user2 = await fakeUserRepository.create({
      name: 'Teste2',
      email: 'teste2@hotmail.com',
      password: '123123',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'Donovan Pechetti',
      email: 'dovi_pf@hotmail.com',
      password: '123123',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
