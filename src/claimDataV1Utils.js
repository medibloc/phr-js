import Panaceajs from '@medibloc/panacea-js';
import protobuf from 'protobufjs/light';
import * as jsonDescriptor from 'claimDataV1.pb.json';

const hashClaim = (claim) => {
  const convertedClaim = claim; // TODO : validating and mapping values

  const root = protobuf.Root.fromJSON(jsonDescriptor);
  const Claim = root.lookupType('Claim');
  const errMsg = Claim.verify(convertedClaim);
  if (errMsg) throw Error(errMsg);

  const message = Claim.create(convertedClaim);
  const buf = Claim.encode(message).finish();

  return Panaceajs.utils.sha3(buf);
};

const validateClaim = (claim) => {
  const root = protobuf.Root.fromJSON(jsonDescriptor);
  const Claim = root.lookupType('Claim');
  const errMsg = Claim.verify(claim);
  if (errMsg) throw Error(errMsg);
};

const fillClaim = (claim) => {
  validateClaim(claim);

  const filled = claim;
  filled.version = 1;

  // TODO : fill recursively
  return filled;
};

export default {
  hashClaim,
  fillClaim,
};
