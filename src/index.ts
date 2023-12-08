require('dotenv').config();
import type {
  Context,
  HttpFunction,
} from '@google-cloud/functions-framework/build/src/functions';
import {PubsubMessage} from '@google-cloud/pubsub/build/src/publisher';
import {checkHttpMethod, handleError} from './helpers/errors';
import {validateHeaders} from './helpers/headers';
import {writeSuccessLog} from './helpers/logging';

export const helloWorld: HttpFunction = (req, res) => {
  try {
    checkHttpMethod(req, ['POST']);

    // validateHeaders(req.headers, req.method);

    res.status(200);
    const body = {
      data: {
        message: 'Hello, World!',
      },
      status: 'success',
    };
    writeSuccessLog(body, 'helloWorld');
    return res.send(body);
  } catch (error) {
    const e = handleError(res, error);
    return res.send(e);
  }
};

export const helloPubSub = (message: PubsubMessage, context: Context) => {
  const name = message.data
    ? Buffer.from(message.data as string, 'base64').toString()
    : 'World';
  console.log(`Hello, ${name}!`);
  console.log('message', message);
  console.log('context', context);
};

