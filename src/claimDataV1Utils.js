import Panaceajs from '@medibloc/panacea-js';
import protobuf from 'protobufjs/light';
import * as jsonDescriptor from 'claimDataV1.pb.json';
import { verify } from './verifier';

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

const fillClaim = (claim) => {
  const filled = claim;
  filled.version = 1;

  // TODO : fill recursively

  verify(jsonDescriptor, 'Claim', claim);

  return filled;
};

export default {
  hashClaim,
  fillClaim,
};
