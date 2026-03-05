import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { DomainError } from '../../books/domain/errors/domain-error';
import { BookNotFoundError } from '../../books/domain/errors/book-not-found-error';

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const { status, error } = this.mapToHttp(exception);

    res.status(status).json({
      statusCode: status,
      error,
      message: exception.message,
      code: exception.code,
      details: exception.details ?? undefined,
    });
  }

  private mapToHttp(exception: DomainError): { status: number; error: string } {
    if (exception instanceof BookNotFoundError) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: `Not Found: #${exception.details?.id}`,
      };
    }

    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Generic Error Occurred',
    };
  }
}
