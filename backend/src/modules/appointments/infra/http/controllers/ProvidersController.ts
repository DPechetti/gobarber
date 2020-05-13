import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderService from '@modules/appointments/services/ListProviderService';

export default class ProvidersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listProviders = container.resolve(ListProviderService);

    const proivders = await listProviders.execute({
      user_id,
    });

    return res.json(proivders);
  }
}
