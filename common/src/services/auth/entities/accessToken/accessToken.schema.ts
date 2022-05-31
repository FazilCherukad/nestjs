import { Schema } from 'mongoose';
import { SchemaPlus } from '../../../../common/mongodb/schema-plus';

export const AuthAccessTokenSchema = new SchemaPlus(
  {
    token: {
      type: String,
      required: true,
    },
    expiry: {
      type: Date,
    },
    isRevoked: {
      type: Boolean,
      required: true,
      default: false,
    },
    authUser: {
      type: Schema.Types.ObjectId,
      ref: 'AuthAuthUser',
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: 'AuthClient',
    },
  },
  {
    collection: 'auth_accessTokens',
    timestamps: true,
  },
);
