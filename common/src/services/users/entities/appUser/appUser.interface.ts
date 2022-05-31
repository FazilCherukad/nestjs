import { Document } from 'mongoose';

export interface IUsersAppUser {
  fId: string;
  authUser: any;
  image: string;
  gender: string;
  customer_code:string;
}
export interface IUsersAppUserDoc extends IUsersAppUser, Document {}
