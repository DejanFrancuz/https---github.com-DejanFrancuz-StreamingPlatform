import { ModuleFederationConfig } from '@nx/module-federation';


const config: ModuleFederationConfig = {
  name: 'dashboard',
  exposes: {
    './Module': 'apps/dashboard/src/app/dashboard.module.ts',
  },
  shared: (libraryName, defaultConfig) => {
  if (libraryName.startsWith('@angular/')) {
    return { ...defaultConfig, eager: true };
  }
  return defaultConfig;
},
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
