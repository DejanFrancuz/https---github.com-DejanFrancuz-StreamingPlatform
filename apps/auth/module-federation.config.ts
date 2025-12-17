import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'auth',
  exposes: {
    './Module': 'apps/auth/src/app/auth.module.ts',
  },
  shared: (libraryName, defaultConfig) => {
    if (
      libraryName === '@angular/platform-browser' ||
      libraryName === '@angular/platform-browser-dynamic'
    ) {
      return {
        ...defaultConfig,
        eager: false,
      };
    }

    return defaultConfig;
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
