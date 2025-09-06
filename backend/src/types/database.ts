// Database row types - exactly match the SQLite schema
export interface QuoteRow {
  id: string;
  name: string;
  vehicleCost: number;
  profit: number;
  sellingPrice: number;
  downPayment: number;
  loanTerm: number;
  interestRate: number;
  taxRate: number;
  monthlyPayment: number;
  totalTaxes: number;
  loanAmount: number;
  totalInterest: number;
  totalPayments: number;
  createdAt: string; // Stored as ISO string in database
}

// SQLite result metadata
export interface DatabaseResult {
  lastID: number;
  changes: number;
}