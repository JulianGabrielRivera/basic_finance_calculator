import dotenv from 'dotenv';

dotenv.config();

export interface Config {
  port: number;
  nodeEnv: string;
  corsOrigin: string;
  database: {
    path: string;
  };
  app: {
    name: string;
    version: string;
  };
}

const config: Config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  database: {
    path: process.env.DATABASE_PATH || './database.sqlite'
  },
  app: {
    name: process.env.APP_NAME || 'Finance Calculator API',
    version: process.env.APP_VERSION || '1.0.0'
  }
};

export default config;