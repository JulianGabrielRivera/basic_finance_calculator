import { ref } from 'vue';
import type { Quote } from '../types/quote';

export const useModals = () => {
  const quoteModal = ref({
    isOpen: false,
    quote: null as Quote | null
  });
  const comparisonModal = ref({
    isOpen: false,
    selectedQuotes: [] as Quote[]

  });

  const confirmModal = ref({
    isOpen: false,
    title: '',
    message: '',
    pendingId: null as string | null
  });

  const openComparisonModal = (selectedQuotes: Quote[]) => {
   
    comparisonModal.value = {isOpen: true, selectedQuotes}
  };

  const openQuoteModal = (quote: Quote) => {
    quoteModal.value = { isOpen: true, quote };
  };

  const closeQuoteModal = () => {
    quoteModal.value = { isOpen: false, quote: null };
  };
  

  const openConfirmModal = (title: string, message: string, id: string) => {
    confirmModal.value = {
      isOpen: true,
      title,
      message,
      pendingId: id
    };
  };

  const closeConfirmModal = () => {
    confirmModal.value = {
      isOpen: false,
      title: '',
      message: '',
      pendingId: null
    };
  };

  const closeComparisonModal = () => {
    comparisonModal.value = { isOpen: false, selectedQuotes: [] };
  };

  return {
    quoteModal,
    comparisonModal,
    confirmModal,
    openQuoteModal,
    openComparisonModal,
    closeQuoteModal,
    openConfirmModal,
    closeConfirmModal,
    closeComparisonModal
  };
};