import { common } from './common';
import { dashboard } from './dashboard';
import { login } from './login';
import { sidebar } from './sidebar';
import { core } from './core';
import { filter } from './filter';

export default {
  ...login,
  ...dashboard,
  ...filter,
  ...core,
  ...sidebar,
  ...common,
};
