import {Logging} from '@google-cloud/logging';

const projectId = String(process.env.PROJECT_ID);

const logging = new Logging({projectId: projectId});
const log = logging.logSync('cloud-functions-log');

const writeLog = (
  data: object,
  message: string,
  severity: string,
  type: string
) => {
  const metadata = {
    resource: {type: 'global'},
    severity: severity,
  };
  const payload = {
    data: data,
    message: message,
    type: type,
  };
  const entry = log.entry(metadata, payload);
  log.write(entry);
};

export const writeErrorLog = (data: object, type: string) => {
  writeLog(data, 'fail', 'ERROR', type);
};

export const writeSuccessLog = (data: object, type: string) => {
  writeLog(data, 'success', 'INFO', type);
};
