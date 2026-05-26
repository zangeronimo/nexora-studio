import { ValidationError } from '../contracts/validation-error';
import { Validator } from '../contracts/validator';

export class RequiredValidator implements Validator<string> {
  constructor() {}

  validate(value: string): ValidationError | null {
    if (!value?.trim()) {
      return { key: 'validation.required' };
    }

    return null;
  }
}
