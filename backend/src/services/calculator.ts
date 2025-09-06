import { QuoteInput, Quote } from '../types/quote';
import { v4 as uuidv4 } from 'uuid';

export class FinanceCalculator {
  static calculateQuote(input: QuoteInput): Quote {
    // Ensure consistency between cost, profit, and selling price
    const adjustedInput = this.adjustPrices(input);
    
    // Calculate the base loan amount
    const baseLoanAmount = adjustedInput.sellingPrice - adjustedInput.downPayment;
    
    // Calculate taxes on the selling price
    const totalTaxes = adjustedInput.sellingPrice * (adjustedInput.taxRate / 100);
    
    // Total loan amount includes taxes
    const loanAmount = baseLoanAmount + totalTaxes;
    
    // Calculate monthly payment using amortization formula
    const monthlyRate = adjustedInput.interestRate / 100 / 12;
    const numPayments = adjustedInput.loanTerm;
    
    let monthlyPayment: number;
    if (monthlyRate === 0) {
      // Simple division if no interest
      monthlyPayment = loanAmount / numPayments;
    } else {
      // Standard amortization formula
      monthlyPayment = loanAmount * 
        (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
        (Math.pow(1 + monthlyRate, numPayments) - 1);
    }
    
    const totalPayments = monthlyPayment * numPayments;
    const totalInterest = totalPayments - loanAmount;
    
    return {
      ...adjustedInput,
      id: uuidv4(),
      name: '', // Will be set when saving
      createdAt: new Date().toISOString(),
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalTaxes: Math.round(totalTaxes * 100) / 100,
      loanAmount: Math.round(loanAmount * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalPayments: Math.round(totalPayments * 100) / 100
    };
  }
  
  private static adjustPrices(input: QuoteInput): QuoteInput {
    const { vehicleCost, profit, sellingPrice } = input;
    
    // If selling price is provided, calculate profit
    if (sellingPrice && vehicleCost) {
      return {
        ...input,
        profit: sellingPrice - vehicleCost
      };
    }
    
    // If cost and profit are provided, calculate selling price
    if (vehicleCost && profit !== undefined) {
      return {
        ...input,
        sellingPrice: vehicleCost + profit
      };
    }
    
    // If selling price and profit are provided, calculate cost
    if (sellingPrice && profit !== undefined) {
      return {
        ...input,
        vehicleCost: sellingPrice - profit
      };
    }
    
    return input;
  }
}