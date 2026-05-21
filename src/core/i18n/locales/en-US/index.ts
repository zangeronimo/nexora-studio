import { common } from './common';
import { sidebar } from './sidebar';
import { dashboard } from './dashboard';
import { login } from './login';

export default {
  ...login,
  ...dashboard,
  ...sidebar,
  ...common,
};
