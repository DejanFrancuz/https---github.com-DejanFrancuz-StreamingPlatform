import { withModuleFederation } from '@nx/module-federation/angular';
import config from './module-federation.config';

/**
 * DTS Plugin is disabled in Nx Workspaces as Nx already provides Typing support for Module Federation
 * The DTS Plugin can be enabled by setting dts: true
 * Learn more about the DTS Plugin here: https://module-federation.io/configure/dts.html
 */
export default withModuleFederation(
  {
    ...config,
    remotes: [
      ['dashboard', 'https://dfpybtxmxgkxr.cloudfront.net/dashboard'],
      ['users', 'https://dfpybtxmxgkxr.cloudfront.net/users'],
      ['movies', 'https://dfpybtxmxgkxr.cloudfront.net/movies'],
      ['auth', 'https://dfpybtxmxgkxr.cloudfront.net/auth'],
      ['payment', 'https://dfpybtxmxgkxr.cloudfront.net/payment'],
    ],
  },
  { dts: false }
);
