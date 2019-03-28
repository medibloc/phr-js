import Panaceajs from '@medibloc/panacea-js';
import protobuf from 'protobufjs/light';
import * as jsonDescriptor from 'certificateDataV1.pb.json';

const hashCertificate = (certificate) => {
  const convertedCertificate = certificate; // TODO : validating and mapping values

  const root = protobuf.Root.fromJSON(jsonDescriptor);
  const Certificate = root.lookupType('Certificate');
  const errMsg = Certificate.verify(convertedCertificate);
  if (errMsg) throw Error(errMsg);

  const message = Certificate.create(convertedCertificate);
  const buf = Certificate.encode(message).finish();

  return Panaceajs.utils.sha3(buf);
};

const validateCertificate = (certificate) => {
  if (!certificate.expiryDate) {
    throw new Error('expiryDate is empty.');
  }
};

const fillCertificate = (certificate) => {
  validateCertificate(certificate);

  const filled = certificate;
  filled.version = 1;

  // TODO : fill recursively
  return filled;
};

export default {
  hashCertificate,
  fillCertificate,
};
