export const DEFAULT_QUOTE_VALUES = {
  VEHICLE_COST: 26906,
  PROFIT: 1500,
  SELLING_PRICE: 28406,
  DOWN_PAYMENT: 0,
  LOAN_TERM: 36,
  INTEREST_RATE: 5.7,
  TAX_RATE: 7.5,
} as const;

export const VALIDATION_LIMITS = {
  LOAN_TERM: {
    MIN: 1,
    MAX: 84,
  },
  INTEREST_RATE: {
    MIN: 0,
    MAX: 50,
  },
  TAX_RATE: {
    MIN: 0,
    MAX: 25,
  },
  DOWN_PAYMENT: {
    MIN: 0,
  },
} as const;

export const TOAST_DURATIONS = {
  SUCCESS: 4000,
  ERROR: 5000,
  INFO: 3000,
  WARNING: 4500,
} as const;

export const API_ENDPOINTS = {
  CALCULATE: '/quotes/calculate',
  SAVE: '/quotes/save',
  GET_ALL: '/quotes',
  DELETE: (id: string) => `/quotes/${id}`,
} as const;

export const MESSAGES = {
  DELETE_CONFIRM_TITLE: 'Delete Quote',
  DELETE_CONFIRM_MESSAGE: (quoteName: string) => 
    `Are you sure you want to delete "${quoteName}"? This action cannot be undone.`,
  DELETE_CONFIRM_FALLBACK: 'Are you sure you want to delete this quote? This action cannot be undone.',
  QUOTE_DELETED_SUCCESS: 'Quote deleted successfully',
  QUOTE_SAVED_SUCCESS: 'Quote saved successfully!',
  QUOTE_NAME_REQUIRED: 'Please enter a quote name to save.',
  CALCULATE_ERROR: 'Failed to calculate quote. Please try again.',
  SAVE_ERROR: 'Failed to save quote. Please try again.',
  DELETE_ERROR: 'Failed to delete quote. Please try again.',
  LOAD_ERROR: 'Error loading quotes',
} as const;