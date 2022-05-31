import { Document } from 'mongoose';

export interface IUsersMobileVerification {
  fId: string;
  mobileNo: string;
  code: string;
  smsResp: string;
  email: string;
}
export interface IUsersMobileVerificationDoc
  extends IUsersMobileVerification,
    Document {}
