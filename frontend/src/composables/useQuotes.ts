import { ref, onMounted } from 'vue';
import { quoteService } from '../services/api';
import type { Quote, QuoteInput } from '../types/quote';

export const useQuotes = () => {
  const currentQuote = ref<Quote | null>(null);
  const savedQuotes = ref<Quote[]>([]);
  const isLoading = ref(false);

  const calculateQuote = async (input: QuoteInput): Promise<Quote | null> => {
    try {
      isLoading.value = true;
      const quote = await quoteService.calculateQuote(input);
      currentQuote.value = quote;
      return quote;
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const saveQuote = async (quoteData: QuoteInput & { name: string }): Promise<Quote> => {
    try {
      isLoading.value = true;
      const savedQuote = await quoteService.saveQuote(quoteData);
      await loadQuotes();
      return savedQuote;
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteQuote = async (id: string): Promise<void> => {
    try {
      isLoading.value = true;
      await quoteService.deleteQuote(id);
      
      // Remove from local state
      savedQuotes.value = savedQuotes.value.filter(q => q.id !== id);
      
      // Clear current quote if it's the one being deleted
      if (currentQuote.value?.id === id) {
        currentQuote.value = null;
      }
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const loadQuotes = async (): Promise<void> => {
    try {
      isLoading.value = true;
      savedQuotes.value = await quoteService.getQuotes();
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  };


  // Initialize quotes on mount
  onMounted(() => {
    loadQuotes();
  });

  return {
    // State
    currentQuote,
    savedQuotes,
    isLoading,
    
    // Actions
    calculateQuote,
    saveQuote,
    deleteQuote,
    loadQuotes,
  };
};