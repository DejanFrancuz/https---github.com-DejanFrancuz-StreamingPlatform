import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'payment',
  exposes: {
    './Module': 'apps/payment/src/app/payment.module.ts',
  },
  shared: (libraryName, sharedConfig) => {
    if (
      libraryName === '@angular/platform-browser' ||
      libraryName === '@angular/platform-browser-dynamic'
    ) {
      return {
        singleton: true,
        strictVersion: false,
        requiredVersion: false,
      };
    }

    return sharedConfig;
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
