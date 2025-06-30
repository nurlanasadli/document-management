export interface DocumentView {
  documentId: string;
  isRestricted: boolean;
  extension: string;
  name?: string;
  square?: string;
  farmerid?: string;
  violation?: string;
  status?: string;
  district?: string;
  isVersion: boolean;
  isFromPreview?:boolean;
  id?: string;
}


 export enum StatusEnum {
   Created  , Approved , Checked , Deleted
 }

export function getValueStatus(value): any{
  return Object.keys(StatusEnum)[value]
}