import { ValidationError } from '../contracts/validation-error';
import { Validator } from '../contracts/validator';

export class MaxLengthValidator implements Validator<string> {
  constructor(private readonly max: number) {}

  validate(value: string): ValidationError | null {
    if (value?.trim().length > this.max) {
      return { key: 'validation.maxLength', params: { max: this.max } };
    }

    return null;
  }
}
