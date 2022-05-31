// import { Schema } from 'mongoose';
// import { SchemaPlus } from '../../../../common/mongodb/schema-plus';

// export const UsersAppUserSchema = new SchemaPlus(
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
//     address: {
//       type: String,
//       //required: true,
//     },
//     branches: [{
//       type: Schema.Types.ObjectId,
//       ref: 'CompanyBranch',
//       default: []
//       // required: true,
//     }],
//     image: {
//       type: String,
//       //required: true
//     },
//     area: {
//       type: Schema.Types.ObjectId,
//       ref: 'CompanyArea',
//       // required: true,
//     },
//     gender: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     collection: 'users_appUsers',
//     timestamps: true,
//   },
// );
