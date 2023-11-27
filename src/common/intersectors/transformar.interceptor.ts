import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  statusCode: number;
  message: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const statusCode = context.switchToHttp().getRequest().res.statusCode;
    // const body = context.switchToHttp().getResponse();
    // console.log(body);
    return next.handle().pipe(
      map((data) => ({
        data,
        statusCode: statusCode,
        message: 'Success',
      })),
    );
  }
}

// statusCode
