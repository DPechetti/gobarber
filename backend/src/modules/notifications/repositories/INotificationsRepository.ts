import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

export default interface INotificationRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}
