import assert from 'assert';
import { describe, beforeEach, it } from 'mocha';
import { fillCertificate } from '../src/certificateDataV1Utils';

describe('fillCertificate', () => {
  let sampleCertificate;

  beforeEach(() => {
    sampleCertificate = fillCertificate({
      // version: 1,
      blockchainAddress: '03107c5eae25e0443be09496162362fee885402379ee4c0fca30af8dbaa340e507',
      expiryDate: '2019-07-01 15:01:20',
      certification: {
        certificationResult: 'success',
        personName: '홍길동',
        personBirthdate: '19750101',
        personGender: '1',
        personNation: '0',
        personCi: 'D2i6IJki20OCwiwk+CCyM0cJL1ZFMambjSzdWTwQ3qh/2MlI4cFv2/DBKt3XJMHLfMpEWRqGh5jTVziz9+H/ZA==',
        personMobileCompany: 'ABC',
        personMobileNumber: '01012345678',
      },
    });
  });

  it('success', () => {
    fillCertificate(sampleCertificate);
    console.log('No Error');
  });

  it('fail - missing field', () => {
    sampleCertificate.expiryDate = null;
    assert.throws(() => {
      try {
        fillCertificate(sampleCertificate);
      } catch (err) {
        console.log(err);
        throw err;
      }
    }, /expiryDate: string expected/);
  });

  it('fail - invalid field', () => {
    sampleCertificate.zzzzzz = 'invalidValue';
    assert.throws(() => {
      try {
        fillCertificate(sampleCertificate);
      } catch (err) {
        console.log(err);
        throw err;
      }
    }, /invalid field detected(.|\n)+- *zzzzzz: 'invalidValue'/);
  });
});
