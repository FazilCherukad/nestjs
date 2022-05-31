import { Schema } from 'mongoose';
import * as mongoose_delete from 'mongoose-delete';

export class SchemaPlus extends Schema {
  constructor(...args) {
    super(...args);

    //@ts-ignore
    this.options.toJSON = {
      transform: function(doc, ret, options) {
        if (ret._id) {
          ret.id = ret._id;
          delete ret._id;
        }
      },
    };
    this.plugin(mongoose_delete, { deletedAt: true, overrideMethods: 'all' });
  }
}
