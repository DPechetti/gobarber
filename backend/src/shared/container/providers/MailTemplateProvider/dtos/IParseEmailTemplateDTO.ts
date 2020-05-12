interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseEmailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}
