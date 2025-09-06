export interface Config {
  api: {
    baseUrl: string;
  };
  app: {
    name: string;
    version: string;
  };
  development: boolean;
}

const config: Config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'
  },
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Finance Calculator',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0'
  },
  development: import.meta.env.DEV
};

export default config;