import sqlite3 from 'sqlite3';
import path from 'path';
import config from '../config/environment';

const dbPath = path.isAbsolute(config.database.path) 
  ? config.database.path 
  : path.join(process.cwd(), config.database.path);

export class DatabaseConnection {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database(dbPath);
    this.init();
  }

  private async init() {
    try {
      await this.createTables();
      console.log(`📊 Database initialized: ${dbPath}`);
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  private createTables(): Promise<void> {
    return new Promise((resolve, reject) => {
      const sql = `
        CREATE TABLE IF NOT EXISTS quotes (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL DEFAULT 'Unnamed Quote',
          vehicleCost REAL NOT NULL,
          profit REAL NOT NULL,
          sellingPrice REAL NOT NULL,
          downPayment REAL NOT NULL,
          loanTerm INTEGER NOT NULL,
          interestRate REAL NOT NULL,
          taxRate REAL NOT NULL,
          monthlyPayment REAL NOT NULL,
          totalTaxes REAL NOT NULL,
          loanAmount REAL NOT NULL,
          totalInterest REAL NOT NULL,
          totalPayments REAL NOT NULL,
          createdAt TEXT NOT NULL
        )
      `;

      this.db.run(sql, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  getDb(): sqlite3.Database {
    return this.db;
  }

  close(): void {
    this.db.close();
  }
}