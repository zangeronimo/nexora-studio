import { Storage } from '@application/base/contracts/storage';

export class LocalStorage implements Storage {
  get<T>(key: string): T | null {
    const result = localStorage.getItem(key);
    return result ? JSON.parse(result) : null;
  }
  set(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
