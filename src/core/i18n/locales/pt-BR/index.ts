import { common } from './common';
import { dashboard } from './dashboard';
import { login } from './login';
import { sidebar } from './sidebar';

export default {
  ...login,
  ...dashboard,
  ...sidebar,
  ...common,
};
