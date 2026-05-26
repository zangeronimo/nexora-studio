import { ValidationError } from './contracts/validation-error';
import { Validator } from './contracts/validator';

export function validate(
  value: string,
  validators: Validator<string>[],
): ValidationError | null {
  for (const validator of validators) {
    const error = validator.validate(value);

    if (error) {
      return error;
    }
  }

  return null;
}
