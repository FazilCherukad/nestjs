declare module 'mongoose' {

  interface DeleteOptions {
      deletedAt: boolean;
      deletedBy: boolean;
      overrideMethods: string | boolean | string[];
      validateBeforeDelete: boolean;
      indexFields: string | boolean | string[];
  }

  interface Result<T> {
      result: T[];
  }

  interface ModelPlus<T extends Document> extends Model<T> {
      deleteById(condition?: any, callback?: (err: any, result: Result<T>) => void): Promise<Result<T>>;
      delete(condition?: any, options?: DeleteOptions, callback?: (err: any, result: Result<T>) => void): Promise<Result<T>>;
      restore(condition?: any, callback?: (err: any, result: Result<T>) => void): Promise<Result<T>>;
      countDeleted(condition?: any, callback?: (err: any, result: Result<T>) => void): Promise<Result<T>>;
      findDeleted(condition?: any, callback?: (err: any, result: Result<T>) => void): Promise<Result<T>>;
      findOneDeleted(condition?: any, callback?: (err: any, result: Result<T>) => void): Promise<Result<T>>;
      findOneAndUpdateDeleted(condition?: any, callback?: (err: any, result: Result<T>) => void): Promise<Result<T>>;
      updateDeleted(condition?: any, callback?: (err: any, result: Result<T>) => void): Promise<Result<T>>;
      countWithDeleted(condition?: any, callback?: (err: any, result: Result<T>) => void): Promise<Result<T>>;
      findWithDeleted(condition?: any, callback?: (err: any, result: Result<T>) => void): Promise<Result<T>>;
      findOneWithDeleted(condition?: any, callback?: (err: any, result: Result<T>) => void): Promise<Result<T>>;
      findOneAndUpdateWithDeleted(condition?: any, callback?: (err: any, result: Result<T>) => void): Promise<Result<T>>;
      updateWithDeleted(condition?: any, callback?: (err: any, result: Result<T>) => void): Promise<Result<T>>;
  }

  function model(
      name: string,
      schema?: Schema,
      collection?: string,
      skipInit?: boolean): ModelPlus<any>;
}

import mongoose = require('mongoose');
import { SchemaPlus } from 'ibap-common/dist/common/mongodb/schema-plus';
declare function _(schema: SchemaPlus): void;