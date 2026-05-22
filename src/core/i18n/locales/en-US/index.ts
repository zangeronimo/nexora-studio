import { common } from './common';
import { sidebar } from './sidebar';
import { dashboard } from './dashboard';
import { login } from './login';
import { core } from './core';

export default {
  ...login,
  ...dashboard,
  ...core,
  ...sidebar,
  ...common,
};
