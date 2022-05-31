// import { Schema } from 'mongoose';
// import { SchemaPlus } from '../../../../common/mongodb/schema-plus';

// export const UsersIbapUserSchema = new SchemaPlus(
//   {
//     fId: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     authUser: {
//       type: Schema.Types.ObjectId,
//       ref: 'AuthAuthUser',
//       required: true,
//     },
//     roles: {
//       type: Schema.Types.Mixed
//     },
//     firstName_Ml: {
//       type: Schema.Types.Mixed,
//       // required: true,
//     },
//     lastName_Ml: {
//       type: Schema.Types.Mixed,
//       // required: true,
//     },
//     area: {
//       type: Schema.Types.ObjectId,
//       ref: 'CompanyArea',
//       // required: true,
//     },
//     branches: [{
//       type: Schema.Types.ObjectId,
//       ref: 'CompanyBranch',
//       // required: true,
//       default: [],
//     }],
//   },
//   {
//     collection: 'users_ibapUsers',
//     timestamps: true,
//   },
// );
