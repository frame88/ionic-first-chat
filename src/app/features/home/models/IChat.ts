import { IMessage } from 'src/app/features/home/models/IMessage';
export interface IChat {
  users: string[];
  messages: IMessage[];
}
