import { Schema, SchemaType } from 'mongoose';
import { SchemaPlus } from '../../../../common/mongodb/schema-plus';

export const UsersExecutiveUserSchema = new SchemaPlus(
  {
    fId: {
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
    profession:{
      type: String
    },
    executive_code:{
      type: String,
      required: true,
      unique: true
    },
    status:{
      type: String,
      required: true
    },
    attributes:{
      type: Schema.Types.Mixed
    },
    account_details:{
      type: Schema.Types.Mixed
    },
    account_type:{
      type: String,
      required: true,
      enums:['Normal', 'Professional']
    },
    call_cost:{
      type: Number,
      default: 1
    },
    rating:{
      type: Number,
      default: 3
    },
    total_calls:{
      type: Number,
      default: 0
    },
    free_coins:{
      type:Number,
      default:0
    },
    premium_coins:{
      type:Number,
      default:0
    },
    coins_redeemed:{
      type:Number,
      default:0
    }
  },
  {
    collection: 'users_executiveUsers',
    timestamps: true,
  },
);
