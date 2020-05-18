import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const provider_id = req.user.id;
    const { day, month, year } = req.body;

    const listProvider = container.resolve(ListProviderAppointmentsService);

    const appointments = await listProvider.execute({
      provider_id,
      day,
      month,
      year,
    });

    return res.json(appointments);
  }
}
