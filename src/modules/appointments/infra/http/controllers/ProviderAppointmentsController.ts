import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.query;

    const listProviderAppointmentsServicer = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listProviderAppointmentsServicer.execute({
      day: Number(day),
      month: Number(month),
      year: Number(year),
      provider_id,
    });

    return response.json(appointments);
  }
}
