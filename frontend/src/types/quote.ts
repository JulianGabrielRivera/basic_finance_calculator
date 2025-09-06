export interface QuoteInput {
  vehicleCost: number;
  profit: number;
  sellingPrice: number;
  downPayment: number;
  loanTerm: number;
  interestRate: number;
  taxRate: number;
}

export interface Quote extends QuoteInput {
  id: string;
  name: string;
  createdAt: string; // ISO string format - simple and works with JSON
  monthlyPayment: number;
  totalTaxes: number;
  loanAmount: number;
  totalInterest: number;
  totalPayments: number;
}