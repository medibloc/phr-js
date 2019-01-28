import Medjs from 'medjs';
import protobuf from 'protobufjs/light';
import * as jsonDescriptor from 'hospitalDataV1.pb.json';

const hashBill = (bill) => {
  const convertedBill = bill; // TODO : validating and mapping values

  const root = protobuf.Root.fromJSON(jsonDescriptor);
  const Bill = root.lookupType('Bill');
  const errMsg = Bill.verify(convertedBill);
  if (errMsg) throw Error(errMsg);

  const message = Bill.create(convertedBill);
  const buf = Bill.encode(message).finish();

  return Medjs.utils.sha3(buf);
};

const fillBill = (bill) => {
  const filled = bill;
  filled.version = 1;

  // TODO : fill recursively
  return filled;
};

export default {
  hashBill,
  fillBill,
};
