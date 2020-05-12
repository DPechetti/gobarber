import IParseEmailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseEmailTemplateDTO';

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  from?: IMailContact;
  to: IMailContact;
  subject: string;
  templateData: IParseEmailTemplateDTO;
}
