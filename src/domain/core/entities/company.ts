import { Entity } from '@domain/base/entities/entity';
import { status } from '@domain/base/enums/status';
import { Module } from './module';

export class Company extends Entity {
  constructor(
    id: string,
    readonly name: string,
    readonly status: status,
    readonly modules: Module[],
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, createdAt, updatedAt);
  }
}
