// import { Schema } from 'mongoose';
// import { SchemaPlus } from '../../../../common/mongodb/schema-plus';

// export const UsersDeviceSchema = new SchemaPlus(
//   {
//     device: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     location: {
//       type: {
//         type: String,
//         enum: ['Point'],
//         required: true,
//       },
//       coordinates: {
//         type: [Number],
//         required: true,
//       },
//     },
//     authUser: {
//       type: Schema.Types.ObjectId,
//       ref: 'AuthAuthUser',
//       required: true,
//     },
//     branch: {
//       type: Schema.Types.ObjectId,
//       // required: true
//     },
//     language: {
//       type: String,
//       required: true,
//     },
//     // notifyAll: {
//     //   type: Boolean
//     // },
//     // notifyWall: {
//     //   type: Boolean
//     // },
//     // notifyLoyalty: {
//     //   type: Boolean
//     // },
//     // notifyOthers: {
//     //   type: Boolean
//     // },
//     // colorTheme: {
//     //   type: String,
//     //   required: true
//     // },
//     // autoLocate: {
//     //   type: Boolean
//     // },
//     // shake: {
//     //   type: Boolean
//     // },
//     // vibrate: {
//     //   type: Boolean
//     // },
//     platform: {
//       type: String,
//     },
//     settings: {
//       type: Schema.Types.Mixed,
//       required: true,
//     },
//     firebaseId: {
//       type: String,
//     },
//   },
//   {
//     collection: 'app_user_devices',
//     timestamps: true,
//   },
// );
