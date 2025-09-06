import { DatabaseConnection } from './connection';
import { QuoteRepository } from './repositories/quoteRepository';

// Create single database connection instance
const databaseConnection = new DatabaseConnection();

// Create repository instances
export const quoteRepository = new QuoteRepository(databaseConnection.getDb());

// Export connection for cleanup if needed
export const closeDatabase = () => {
  databaseConnection.close();
};