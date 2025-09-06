import { useToast } from './useToast';
import { useModals } from './useModals';
import { useQuotes } from './useQuotes';
import { MESSAGES } from '../constants/defaults';
import type { Quote, QuoteInput } from '../types/quote';

export const useQuoteManager = () => {
  const { showSuccess, showError } = useToast();
  const {
    quoteModal,
    confirmModal,
    openQuoteModal,
    closeQuoteModal,
    openConfirmModal,
    closeConfirmModal
  } = useModals();
  const {
    currentQuote,
    savedQuotes,
    isLoading,
    calculateQuote,
    saveQuote,
    deleteQuote
  } = useQuotes();

  const handleCalculate = async (input: QuoteInput) => {
    try {
      await calculateQuote(input);
    } catch (error) {
      showError(MESSAGES.CALCULATE_ERROR);
    }
  };

  const handleSaveQuote = async (name: string) => {
    if (!currentQuote.value) return;
    
    try {
      await saveQuote({
        ...currentQuote.value,
        name 
      });
      showSuccess(MESSAGES.QUOTE_SAVED_SUCCESS);
    } catch (error) {
      showError(MESSAGES.SAVE_ERROR);
    }
  };

  const handleViewModal = (quote: Quote) => {
    openQuoteModal(quote);
  };

  const handleCloseModal = () => {
    closeQuoteModal();
  };

  const handleModalDelete = (id: string) => {
    handleDeleteQuote(id);
    closeQuoteModal();
  };

  const handleDeleteQuote = (id: string) => {
    const quote = savedQuotes.value.find(q => q.id === id);
    const message = quote 
      ? MESSAGES.DELETE_CONFIRM_MESSAGE(quote.name)
      : MESSAGES.DELETE_CONFIRM_FALLBACK;
    
    openConfirmModal(MESSAGES.DELETE_CONFIRM_TITLE, message, id);
  };

  const handleConfirmDelete = async () => {
    if (!confirmModal.value.pendingId) return;
    
    try {
      await deleteQuote(confirmModal.value.pendingId);
      showSuccess(MESSAGES.QUOTE_DELETED_SUCCESS);
    } catch (error) {
      showError(MESSAGES.DELETE_ERROR);
    } finally {
      closeConfirmModal();
    }
  };

  const handleCancelDelete = () => {
    closeConfirmModal();
  };

  return {
    // State
    currentQuote,
    savedQuotes,
    quoteModal,
    confirmModal,
    isLoading,
    
    // Methods
    handleCalculate,
    handleSaveQuote,
    handleViewModal,
    handleCloseModal,
    handleModalDelete,
    handleDeleteQuote,
    handleConfirmDelete,
    handleCancelDelete
  };
};