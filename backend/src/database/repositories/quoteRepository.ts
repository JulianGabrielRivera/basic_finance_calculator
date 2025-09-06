import { Database } from 'sqlite3';
import { Quote } from '../../types/quote';
import { QuoteRow, DatabaseResult } from '../../types/database';

export class QuoteRepository {
  constructor(private db: Database) {}

  async saveQuote(quote: Quote): Promise<Quote> {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO quotes (
          id, name, vehicleCost, profit, sellingPrice, downPayment,
          loanTerm, interestRate, taxRate,
          monthlyPayment, totalTaxes, loanAmount, totalInterest,
          totalPayments, createdAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const params = [
        quote.id,
        quote.name || 'Unnamed Quote',
        quote.vehicleCost,
        quote.profit,
        quote.sellingPrice,
        quote.downPayment,
        quote.loanTerm,
        quote.interestRate,
        quote.taxRate,
        quote.monthlyPayment,
        quote.totalTaxes,
        quote.loanAmount,
        quote.totalInterest,
        quote.totalPayments,
        quote.createdAt
      ];

      this.db.run(sql, params, function(this: DatabaseResult, err) {
        if (err) {
          reject(err);
        } else {
          resolve(quote);
        }
      });
    });
  }

  async getQuotes(): Promise<Quote[]> {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM quotes ORDER BY createdAt DESC';

      this.db.all(sql, [], (err, rows: QuoteRow[]) => {
        if (err) {
          reject(err);
        } else {
          // QuoteRow already matches Quote interface, no transformation needed
          resolve(rows as Quote[]);
        }
      });
    });
  }

  async getQuote(id: string): Promise<Quote | null> {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM quotes WHERE id = ?';

      this.db.get(sql, [id], (err, row: QuoteRow | undefined) => {
        if (err) {
          reject(err);
        } else if (row) {
          // QuoteRow already matches Quote interface, no transformation needed
          resolve(row as Quote);
        } else {
          resolve(null);
        }
      });
    });
  }

  async deleteQuote(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM quotes WHERE id = ?';

      this.db.run(sql, [id], function(this: DatabaseResult, err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes > 0);
        }
      });
    });
  }
}