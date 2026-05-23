import { common } from './common';
import { sidebar } from './sidebar';
import { dashboard } from './dashboard';
import { login } from './login';
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
