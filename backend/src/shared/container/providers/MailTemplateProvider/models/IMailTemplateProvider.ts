import IParseEmailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseEmailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IParseEmailTemplateDTO): Promise<string>;
}
