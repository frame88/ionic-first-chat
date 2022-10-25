import { IMessage } from 'src/app/models/IMessage';
export interface IChat {
  users: string[];
  messages: IMessage[];
}
