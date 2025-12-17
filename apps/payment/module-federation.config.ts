import { ModuleFederationConfig } from '@nx/module-federation';


const config: ModuleFederationConfig = {
  name: 'payment',
  exposes: {
    './Module': 'apps/payment/src/app/payment.module.ts',
  },
  shared: (libraryName, defaultConfig) => {
  if (libraryName.startsWith('@angular/') ||
    libraryName === 'rxjs' ||
    libraryName === 'rxjs/operators' ||
    libraryName === 'tslib'
  ) {
    return { ...defaultConfig, eager: true };
  }
  return defaultConfig;
},
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
