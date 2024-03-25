import { PrimaryKey } from './base';

export type PromptTemplate = {
  prefix: string;
  suffix: string;
  join: string;
  user: string;
  assistant: string;
  system: string;
  eosToken: string;
};

export type PromptAttributes = {
  uuid:string;
  title: string;
  content: string;
  type: string;
  userId: string;
  updatedDate: string;
};

export type RecordedPrompt = PrimaryKey &
  PromptAttributes

export type ToBeRecordedPrompt =  {
  title: string;
  content: string;
  type: string;
};

export type UpdatePromptRequest = {
  uuid: string;
  content: string;
};
