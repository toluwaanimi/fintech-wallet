import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpResponse {
  static send(
    message: string,
    data?: {
      data?: any;
      meta?: any;
    },
  ) {
    if (!data) {
      return {
        status: true,
        message,
      };
    } else if (data.data && data.meta) {
      return {
        status: true,
        message,
        data: data.data,
        meta: data.meta,
      };
    } else if (data.data) {
      return {
        status: true,
        message,
        data: data.data,
      };
    }
  }

  static error(
    code: string,
    message: string,
    content: Record<string, unknown>,
  ) {
    const data = {
      status: false,
      message,
      data: content,
    };

    throw new HttpException(data, HttpStatus[code]);
  }
}
