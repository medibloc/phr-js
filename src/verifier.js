import assert from 'assert';
import protobuf from 'protobufjs/light';

const verify = (descriptor, lookupType, target) => {
  const root = protobuf.Root.fromJSON(descriptor);
  const Claim = root.lookupType(lookupType);

  const errMsg = Claim.verify(target);
  if (errMsg) {
    throw Error(errMsg);
  }

  const buffer = Claim.encode(target).finish();
  const decoded = Claim.decode(buffer);
  const expected = Claim.toObject(decoded);

  try {
    assert.deepStrictEqual(target, expected);
  } catch (err) {
    if (err instanceof assert.AssertionError) {
      throw Error(`invalid field detected\n${err}`);
    } else {
      throw Error(err);
    }
  }
};

export default { verify };
