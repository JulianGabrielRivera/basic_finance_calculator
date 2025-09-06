import { Response } from 'express';
import { ApiResponse } from '../types/api';

export class ResponseHelper {
  static success<T>(res: Response, data?: T, statusCode: number = 200): Response {
    const response: ApiResponse<T> = {
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString()
      }
    };
    return res.status(statusCode).json(response);
  }

  static error(res: Response, message: string, statusCode: number = 500, code?: string, details?: any): Response {
    const response: ApiResponse = {
      success: false,
      error: {
        message,
        code,
        details
      },
      meta: {
        timestamp: new Date().toISOString()
      }
    };
    return res.status(statusCode).json(response);
  }

  static created<T>(res: Response, data: T): Response {
    return this.success(res, data, 201);
  }

  static noContent(res: Response): Response {
    return res.status(204).send();
  }

  static badRequest(res: Response, message: string, details?: any): Response {
    return this.error(res, message, 400, 'BAD_REQUEST', details);
  }

  static notFound(res: Response, resource: string = 'Resource'): Response {
    return this.error(res, `${resource} not found`, 404, 'NOT_FOUND');
  }

  static validationError(res: Response, message: string, details?: any): Response {
    return this.error(res, message, 422, 'VALIDATION_ERROR', details);
  }

  static internalError(res: Response, message: string = 'Internal server error', details?: any): Response {
    return this.error(res, message, 500, 'INTERNAL_ERROR', details);
  }
}