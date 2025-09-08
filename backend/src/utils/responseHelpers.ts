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

  static created<T>(res: Response, data: T): Response {
    return this.success(res, data, 201);
  }
}