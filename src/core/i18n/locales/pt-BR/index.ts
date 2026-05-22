import { common } from './common';
import { dashboard } from './dashboard';
import { login } from './login';
import { sidebar } from './sidebar';
import { core } from './core';

export default {
  ...login,
  ...dashboard,
  ...core,
  ...sidebar,
  ...common,
};
