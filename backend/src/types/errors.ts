// Error codes enum for consistency
export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  DATABASE_ERROR = 'DATABASE_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR'
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: any;

  constructor(message: string, statusCode: number = 500, code: string = ErrorCode.INTERNAL_ERROR, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 422, ErrorCode.VALIDATION_ERROR, details);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404, ErrorCode.NOT_FOUND);
    this.name = 'NotFoundError';
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = 'Database operation failed', details?: any) {
    super(message, 500, ErrorCode.DATABASE_ERROR, details);
    this.name = 'DatabaseError';
  }
}