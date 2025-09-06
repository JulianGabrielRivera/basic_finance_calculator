import { Router, Request, Response } from 'express';
import { FinanceCalculator } from '../services/calculator';
import { quoteRepository } from '../database';
import { QuoteInput } from '../types/quote';
import { validateQuoteInput, validateSaveQuoteInput } from '../middleware/validation';
import { asyncHandler } from '../middleware/errorHandler';
import { NotFoundError, DatabaseError } from '../types/errors';
import { ResponseHelper } from '../utils/responseHelpers';

const router = Router();

// Calculate a new quote
router.post('/calculate', validateQuoteInput, asyncHandler(async (req: Request, res: Response) => {
  const input: QuoteInput = req.body;
  const quote = FinanceCalculator.calculateQuote(input);
  return ResponseHelper.success(res, quote);
}));

// Save a quote
router.post('/save', validateSaveQuoteInput, asyncHandler(async (req: Request, res: Response) => {
  const { name, ...input }: { name?: string } & QuoteInput = req.body;
  const quote = FinanceCalculator.calculateQuote(input);
  quote.name = name || 'Unnamed Quote';
  
  try {
    const savedQuote = await quoteRepository.saveQuote(quote);
    return ResponseHelper.created(res, savedQuote);
  } catch (error) {
    throw new DatabaseError('Failed to save quote', error);
  }
}));

// Get all quotes
router.get('/', asyncHandler(async (_req: Request, res: Response) => {
  try {
    const quotes = await quoteRepository.getQuotes();
    return ResponseHelper.success(res, quotes);
  } catch (error) {
    throw new DatabaseError('Failed to fetch quotes', error);
  }
}));

// Get a single quote
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  try {
    const quote = await quoteRepository.getQuote(req.params.id);
    if (!quote) {
      throw new NotFoundError('Quote');
    }
    return ResponseHelper.success(res, quote);
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new DatabaseError('Failed to fetch quote', error);
  }
}));

// Delete a quote
router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
  try {
    const deleted = await quoteRepository.deleteQuote(req.params.id);
    if (!deleted) {
      throw new NotFoundError('Quote');
    }
    return ResponseHelper.success(res, { deleted: true });
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new DatabaseError('Failed to delete quote', error);
  }
}));

export default router;