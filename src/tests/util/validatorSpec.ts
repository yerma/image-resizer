import * as validator from '../../util/validator';

const baseFields = {
  filename: 'test.jpg',
  width: '200',
  height: '200',
  format: 'png'
};

describe('Validator specs', () => {
  it('should return true if all fields are valid', () => {
    const response = validator.validateParams(baseFields);
    expect(response.valid).toBeTrue();
    expect(response.errors).toBeFalsy();
  });

  it('should return errors if missing required param', () => {
    const fields = { ...baseFields };
    fields.format = '';

    const response = validator.validateParams(fields);
    expect(response.valid).toBeFalse();
    expect(response.errors).toBeTruthy();
  });

  it('should return errors if dimensions are not numeric', () => {
    const fields = {
      ...baseFields,
      width: 'asd',
      height: 'asd'
    };
    const response = validator.validateParams(fields);
    expect(response.valid).toBeFalse();
    expect(response.errors).toBeTruthy();
  });

  it('should return errors if invalid format', () => {
    const fields = {
      ...baseFields,
      format: 'tiff'
    };
    const response = validator.validateParams(fields);
    expect(response.valid).toBeFalse();
    expect(response.errors).toBeTruthy();
  });
});
