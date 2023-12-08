import axios from 'axios';
import {Request, Response} from 'express';
import {writeErrorLog} from './logging';

class CustomError extends Error {
  status;

  constructor(status: number, name: string, message: string) {
    super(message);
    this.name = name;
    this.status = status;
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(400, 'Bad Request', message);
  }
}

export class NotAcceptableError extends CustomError {
  constructor(message: string) {
    super(406, 'Not Acceptable', message);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(404, 'Not Found', message);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(401, 'Unauthorized', message);
  }
}

export class UnsupportedMediaTypeError extends CustomError {
  constructor(message: string) {
    super(415, 'Unsupported Media Type', message);
  }
}

export const checkHttpMethod = (
  req: Request,
  requiredHttpMethods: string[]
) => {
  if (!requiredHttpMethods.includes(req.method)) {
    throw new NotFoundError('Invalid HTTP method');
  }
};

export const handleError = (res: Response, error: Error | unknown) => {
  if (error instanceof CustomError) {
    res.status(error.status);
    try {
      const json = JSON.parse(error.message) as string[];
      const body = {
        errors: json.map(message => ({message: message, name: error.name})),
        status: 'fail',
      };
      writeErrorLog(body, 'error');
      return body;
    } catch (e) {
      const body = {
        errors: [{message: error.message, name: error.name}],
        status: 'fail',
      };
      writeErrorLog(body, 'error');
      return body;
    }
  } else if (axios.isAxiosError(error)) {
    res.status(400);
    if (error.response && error.response.data) {
      const body = {
        errors: [{message: error.response.data, name: 'API Error'}],
        status: 'fail',
      };
      writeErrorLog(body, 'error');
      return body;
    } else {
      const body = {
        errors: [{message: 'Unknown error', name: 'API Error'}],
        status: 'fail',
      };
      writeErrorLog(body, 'error');
      return body;
    }
  } else if (error instanceof Error) {
    res.status(500);
    const body = {
      errors: [{message: error.message, name: error.name}],
      status: 'fail',
    };
    writeErrorLog(body, 'error');
    return body;
  }
  res.status(500);
  const body = {
    errors: [{message: 'Unknown error', name: 'Error'}],
    status: 'fail',
  };
  writeErrorLog(body, 'error');
  return body;
};
