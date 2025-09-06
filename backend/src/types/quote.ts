export interface QuoteInput {
  vehicleCost: number;
  profit: number;
  sellingPrice: number;
  downPayment: number;
  loanTerm: number; // in months
  interestRate: number; // annual percentage
  taxRate: number; // percentage
}

export interface Quote extends QuoteInput {
  id: string;
  name: string;
  createdAt: string; // ISO string format - consistent with JSON serialization
  monthlyPayment: number;
  totalTaxes: number;
  loanAmount: number;
  totalInterest: number;
  totalPayments: number;
}