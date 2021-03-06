import assert from 'assert';
import { describe, beforeEach, it } from 'mocha';
import { fillClaim } from '../src/claimDataV1Utils';

describe('fillClaim', () => {
  let sampleClaim;

  beforeEach(() => {
    sampleClaim = fillClaim({
      // version: 1,
      claimNo: '20181204-S1284',
      receipts: [{
        receiptNo: '20181204-S1284',
        receiptType: 'I',
        patientNo: '12345678',
        patientName: '홍길동',
        companyRegistrationNo: '11100999',
        treatmentStartDate: '2018-12-06',
        treatmentEndDate: '2018-12-06',
        treatmentDepartment: '피부과',
        treatmentDepartmentCode: 'DER',
        treatmentType: '',
        treatmentTypeCode: '',
        coveredFee: '11000',
        uncoveredFee: '20000',
        upperLimitExcess: '0',
        payTotal: '31000',
        patientPayTotal: '21000',
        deductAmount: '0',
        advancePayAmount: '0',
        payAmount: '21000',
        uncollectedPayAmount: '0',
        receiptAmount: '21000',
        surtaxAmount: '0',
        cashPayAmount: '0',
        cardPayAmount: '21000',
        feeItems: [{
          feeItemName: '초진 진찰료',
          feeItemCode: '',
          treatmentDate: '2018-12-06',
          coveredType: '',
          medicalChargeCode: 'AA157',
          price: '11000',
          quantity: '1',
          repeatNumber: '1',
          feeTotal: '11000',
          coveredPatientFee: '1000',
          coveredInsuranceFee: '10000',
          coveredPatientAllFee: '0',
          uncoveredChosenFee: '0',
          uncoveredUnchosenFee: '0',
        }, {
          feeItemName: '검사료',
          feeItemCode: '',
          treatmentDate: '2018-12-06',
          coveredType: '',
          medicalChargeCode: 'BB157',
          price: '20000',
          quantity: '1',
          repeatNumber: '1',
          feeTotal: '20000',
          coveredPatientFee: '0',
          coveredInsuranceFee: '0',
          coveredPatientAllFee: '0',
          uncoveredChosenFee: '20000',
          uncoveredUnchosenFee: '0',
        }],
      }],
      diagnoses: [{
        diagnosisCodeVersion: 'ICD-10-2016',
        diagnosisCodeType: 10, // 주상병
        diagnosisCode: 'J00',
      }, {
        diagnosisCodeVersion: 'KCD-7',
        diagnosisCodeType: 20, // 부상병
        diagnosisCode: 'J30.3',
      }],
    });
  });

  it('success', () => {
    fillClaim(sampleClaim);
    console.log('No Error');
  });

  it('fail - missing field', () => {
    sampleClaim.claimNo = null;
    assert.throws(() => {
      try {
        fillClaim(sampleClaim);
      } catch (err) {
        console.log(err);
        throw err;
      }
    }, /claimNo: string expected/);
  });

  it('fail - invalid field', () => {
    sampleClaim.zzzzzz = 'invalidValue';
    assert.throws(() => {
      try {
        fillClaim(sampleClaim);
      } catch (err) {
        console.log(err);
        throw err;
      }
    }, /invalid field detected(.|\n)+- *zzzzzz: 'invalidValue'/);
  });
});
