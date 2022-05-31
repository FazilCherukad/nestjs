import { MongoError } from 'mongodb';
import {
  ExceptionFilter,
  ArgumentsHost,
  Catch,
  UnprocessableEntityException,
} from '@nestjs/common';

@Catch(MongoError)
export class MongoErrorExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = 422;

    response.status(status).send({
      status: 'error',
      code: exception.code,
      error: exception.name,
      message: exception.errmsg,
    });
  }
}
