import { Schema } from 'mongoose';
import { SchemaPlus } from '../../../../common/mongodb/schema-plus';

export const UsersAppUserSchema = new SchemaPlus(
  {
    fId: {
      type: String,
      required: true,
      unique: true,
    },
    customer_code:{
      type: String,
      required: true,
      unique: true,
    },
    authUser: {
      type: Schema.Types.ObjectId,
      ref: 'AuthAuthUser',
      required: true,
    },
    image: {
      type: String,
      //required: true
    },
    gender: {
      type: String,
      // required: true,
    }
  },
  {
    collection: 'users_appUsers',
    timestamps: true,
  },
);
