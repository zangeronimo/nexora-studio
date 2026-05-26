import { ValidationError } from '../contracts/validation-error';
import { Validator } from '../contracts/validator';

export class MinLengthValidator implements Validator<string> {
  constructor(private readonly min: number) {}

  validate(value: string): ValidationError | null {
    if (value?.trim().length < this.min) {
      return { key: 'validation.minLength', params: { min: this.min } };
    }

    return null;
  }
}
