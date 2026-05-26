import { ValidationError } from './validation-error';

export interface Validator<T = any> {
  validate(data: T): ValidationError | null;
}
