import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isObject } from 'util';

export interface Response<T> {
  status: string;
  message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => {
        if (!isObject(data))
          return { status: 'succes', message: 'Success', data: data };

        return {
          status: 'status' in data ? data.status : 'success',
          message: 'message' in data ? data.message : 'Success',
          data: 'data' in data ? data.data : data,
        };
      }),
    );
  }
}
