export type Attachment = { _id: string; originalName: string };
export type Rule = {
  _id: string;
  number: string;
  issuedDate: string; // đã format dd/mm/yyyy ở server
  effectiveDate: string; // đã format
  summary: string;
  type: string;
  agency: string;
  attachments?: Attachment[];
};
