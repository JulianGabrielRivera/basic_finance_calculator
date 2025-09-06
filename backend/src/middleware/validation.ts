import { Request, Response, NextFunction } from 'express';
import { QuoteInput } from '../types/quote';

export const validateQuoteInput = (req: Request, res: Response, next: NextFunction): void => {
  const input: QuoteInput = req.body;
  
  // Validate required fields - all except downPayment
  if (!input.vehicleCost || input.profit === undefined || !input.sellingPrice || 
      !input.loanTerm || input.interestRate === undefined || input.taxRate === undefined) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }
  
  // Handle missing or invalid downPayment
  if (input.downPayment === undefined || input.downPayment === null || isNaN(input.downPayment)) {
    input.downPayment = 0;
  }
  
  
  // Validate numeric ranges
  if (input.vehicleCost <= 0) {
    res.status(400).json({ error: 'Vehicle cost must be greater than 0' });
    return;
  }
  
  if (input.loanTerm < 1 || input.loanTerm > 84) {
    res.status(400).json({ error: 'Loan term must be between 1 and 84 months' });
    return;
  }
  
  if (input.interestRate < 0 || input.interestRate > 50) {
    res.status(400).json({ error: 'Interest rate must be between 0 and 50%' });
    return;
  }
  
  if (input.taxRate < 0 || input.taxRate > 25) {
    res.status(400).json({ error: 'Tax rate must be between 0 and 25%' });
    return;
  }
  
  if (input.downPayment < 0) {
    res.status(400).json({ error: 'Down payment cannot be negative' });
    return;
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