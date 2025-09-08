import { Request, Response, NextFunction } from 'express';
import { QuoteInput } from '../types/quote';
import { ValidationError } from '../types/errors';

export const validateQuoteInput = (req: Request, res: Response, next: NextFunction): void => {
  const input: QuoteInput = req.body;
  
  // Validate required fields - all except downPayment
  if (!input.vehicleCost || input.profit === undefined || !input.sellingPrice || 
      !input.loanTerm || input.interestRate === undefined || input.taxRate === undefined) {
    throw new ValidationError('Missing required fields');
  }
  
  // Handle missing or invalid downPayment
  if (input.downPayment === undefined || input.downPayment === null || isNaN(input.downPayment)) {
    input.downPayment = 0;
  }
  
  
  // Validate numeric ranges
  if (input.vehicleCost <= 0) {
    throw new ValidationError('Vehicle cost must be greater than 0');
  }
  
  if (input.loanTerm < 1 || input.loanTerm > 84) {
    throw new ValidationError('Loan term must be between 1 and 84 months');
  }
  
  if (input.interestRate < 0 || input.interestRate > 50) {
    throw new ValidationError('Interest rate must be between 0 and 50%');
  }
  
  if (input.taxRate < 0 || input.taxRate > 25) {
    throw new ValidationError('Tax rate must be between 0 and 25%');
  }
  
  if (input.downPayment < 0) {
    throw new ValidationError('Down payment cannot be negative');
  }
  
  // Store the sanitized input back to req.body
  req.body = input;
  next();
};

export const validateSaveQuoteInput = (req: Request, res: Response, next: NextFunction) => {
  const { name, ...input }: { name?: string } & QuoteInput = req.body;
  
  // Apply quote input validation first
  req.body = input;
  validateQuoteInput(req, res, () => {
    // Restore the name field after validation
    req.body.name = name || 'Unnamed Quote';
    next();
  });
};