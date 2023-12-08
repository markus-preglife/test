import {IncomingHttpHeaders} from 'http';
import {NotAcceptableError, UnsupportedMediaTypeError} from './errors';

export const validateHeaders = (
  headers: IncomingHttpHeaders,
  method: string
) => {
  if (!headers['accept']) {
    throw new NotAcceptableError('Missing Accept header');
  } else if (headers['accept'] !== 'application/json') {
    throw new NotAcceptableError('Invalid Accept header');
  }
  if (method !== 'GET' && method !== 'DELETE') {
    if (!headers['content-type']) {
      throw new UnsupportedMediaTypeError('Missing Content-Type header');
    } else if (headers['content-type'] !== 'application/json') {
      throw new UnsupportedMediaTypeError('Invalid Content-Type header');
    }
  }
};
