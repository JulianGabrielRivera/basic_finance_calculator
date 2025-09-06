import { Request, Response, NextFunction } from 'express';
import { AppError, ErrorCode } from '../types/errors';
import { ApiResponse } from '../types/api';

// Utility functions moved inline since errorUtils was removed
const generateErrorId = (): string => {
  return Math.random().toString(36).substring(2, 10);
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'Unknown error occurred';
};

const isDatabaseConstraintError = (error: any): boolean => {
  return error?.code === 'SQLITE_CONSTRAINT' || 
         error?.errno === 19 || 
         error?.message?.includes('UNIQUE constraint');
};

const isDatabaseConnectionError = (error: any): boolean => {
  return error?.code === 'SQLITE_CANTOPEN' || 
         error?.errno === 14 ||
         error?.message?.includes('database is locked');
};

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const errorId = generateErrorId();
  const timestamp = new Date().toISOString();
  
  // Log error with consistent format
  console.error(`[${errorId}] ${req.method} ${req.path} - ${timestamp}:`, {
    message: getErrorMessage(error),
    stack: error.stack,
    body: req.body,
    params: req.params,
    query: req.query
  });

  // Handle known AppError types
  if (error instanceof AppError) {
    const response: ApiResponse = {
      success: false,
      error: {
        message: error.message,
        code: error.code,
        details: error.details
      },
      meta: {
        timestamp,
        requestId: errorId
      }
    };
    res.status(error.statusCode).json(response);
    return;
  }

  // Handle database constraint errors (duplicate entries, etc.)
  if (isDatabaseConstraintError(error)) {
    const response: ApiResponse = {
      success: false,
      error: {
        message: 'Data validation failed - this record may already exist',
        code: 'DATABASE_CONSTRAINT'
      },
      meta: {
        timestamp,
        requestId: errorId
      }
    };
    res.status(400).json(response);
    return;
  }

  // Handle database connection errors
  if (isDatabaseConnectionError(error)) {
    const response: ApiResponse = {
      success: false,
      error: {
        message: 'Database temporarily unavailable',
        code: 'DATABASE_CONNECTION'
      },
      meta: {
        timestamp,
        requestId: errorId
      }
    };
    res.status(503).json(response);
    return;
  }

  // Handle validation errors from middleware
  if (error.type === 'entity.parse.failed') {
    const response: ApiResponse = {
      success: false,
      error: {
        message: 'Invalid JSON in request body',
        code: 'INVALID_JSON'
      },
      meta: {
        timestamp,
        requestId: errorId
      }
    };
    res.status(400).json(response);
    return;
  }

  // Default to 500 internal server error
  const response: ApiResponse = {
    success: false,
    error: {
      message: process.env.NODE_ENV === 'development' 
        ? getErrorMessage(error)
        : 'Internal server error',
      code: ErrorCode.INTERNAL_ERROR,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    },
    meta: {
      timestamp,
      requestId: errorId
    }
  };

  res.status(500).json(response);
};

// Async error wrapper to catch promise rejections
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};