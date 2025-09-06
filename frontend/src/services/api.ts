import axios from 'axios';
import type { Quote, QuoteInput } from '../types/quote';
import type { ApiResponse } from '../types/api';
import { API_ENDPOINTS } from '../constants/defaults';
import config from '../config/environment';

const api = axios.create({
  baseURL: config.api.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const quoteService = {
  async calculateQuote(input: QuoteInput): Promise<Quote> {
    const response = await api.post<ApiResponse<Quote>>(API_ENDPOINTS.CALCULATE, input);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error?.message || 'Failed to calculate quote');
    }
    return response.data.data;
  },

  async saveQuote(input: QuoteInput & { name?: string }): Promise<Quote> {
    const response = await api.post<ApiResponse<Quote>>(API_ENDPOINTS.SAVE, input);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error?.message || 'Failed to save quote');
    }
    return response.data.data;
  },

  async getQuotes(): Promise<Quote[]> {
    const response = await api.get<ApiResponse<Quote[]>>(API_ENDPOINTS.GET_ALL);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error?.message || 'Failed to fetch quotes');
    }
    return response.data.data;
  },


  async deleteQuote(id: string): Promise<void> {
    const response = await api.delete<ApiResponse<{ deleted: boolean }>>(API_ENDPOINTS.DELETE(id));
    if (!response.data.success) {
      throw new Error(response.data.error?.message || 'Failed to delete quote');
    }
  },
};