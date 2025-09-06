import { ref } from 'vue';
import type { Quote } from '../types/quote';

export const useModals = () => {
  const quoteModal = ref({
    isOpen: false,
    quote: null as Quote | null
  });

  const confirmModal = ref({
    isOpen: false,
    title: '',
    message: '',
    pendingId: null as string | null
  });

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

  return {
    quoteModal,
    confirmModal,
    openQuoteModal,
    closeQuoteModal,
    openConfirmModal,
    closeConfirmModal
  };
};