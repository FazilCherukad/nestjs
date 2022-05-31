import { Document } from 'mongoose';

export interface IUsersExecutiveUser {
  fId: string;
  authUser: any;
  image: string;
  executive_code: string;
  attributes: string;
  account_details: string;
  profession: string;
  call_cost: number;
  account_type: string;
  rating: number;
  total_calls: number;
  free_coins: number;
  premium_coins: number;
  coins_redeemed: number;
  status: string;
}
export interface IUsersExecutiveUserDoc extends IUsersExecutiveUser, Document {}
