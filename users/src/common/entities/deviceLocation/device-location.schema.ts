// import { SchemaPlus } from '../../../../common/mongodb/schema-plus';
// import { Schema } from 'mongoose';

// export const UsersDeviceLocationSchema = new SchemaPlus(
//   {
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
//     type: {
//       type: String,
//       required: false,
//     },
//     device: {
//       type: Schema.Types.ObjectId,
//       ref: 'AppUserDevice',
//       required: true,
//     },
//   },
//   {
//     collection: 'app_user_device_locations',
//     timestamps: true,
//   },
// );
