import Ajv from 'ajv';
import {BadRequestError} from './errors';
import {RegisterData} from './interfaces';

export const validateRequiredFields = (data: RegisterData) => {
  const ajv = new Ajv();
  const schema = {
    type: 'object',
    properties: {
      parent: {ref: 'parent'},
      infant: {ref: 'infant'},
      extra: {ref: 'extra'},
      market: {type: 'string'},
      offerType: {type: 'string'},
      offerMachineName: {type: 'string'},
    },
    required: ['parent', 'infant'],
    definitions: {
      parent: {
        type: 'object',
        properties: {
          ssn: {type: 'string'},
          phoneNumber: {type: 'string'},
          emailAddress: {type: 'string'},
        },
        required: ['ssn', 'phoneNumber', 'emailAddress'],
      },
      infant: {
        type: 'object',
        properties: {
          birthDate: {type: 'string'},
        },
        required: ['birthDate'],
      },
      extra: {
        type: 'object',
        properties: {
          week: {type: 'number'},
          day: {type: 'number'},
          entryPoint: {type: 'string'},
          phoneOS: {type: 'string'},
          appVersion: {type: 'string'},
          installationId: {type: 'string'},
        },
      },
    },
    additionalProperties: true,
  };

  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    if (validate.errors) {
      throw new BadRequestError(
        JSON.stringify(
          validate.errors.map(
            e => `Error in schema path ${e.schemaPath}, ${e.message}`
          )
        )
      );
    } else {
      throw new BadRequestError('Unknown validation error');
    }
  }
};
