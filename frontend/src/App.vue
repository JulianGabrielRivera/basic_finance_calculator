<template>
  <div id="app" class="min-h-screen bg-gray-100">
    <header class="bg-black px-8 py-4">
      <div class="flex items-center gap-3">
        <div class="bg-white rounded-lg p-2">
          <span class="text-black font-bold text-xl">X</span>
        </div>
        <span class="text-white text-xl font-bold">DeskPro</span>
      </div>
    </header>

    <main class="max-w-7xl mx-auto p-8">
      <div class="grid lg:grid-cols-2 gap-8 mb-8">
        <div>
          <QuoteForm @calculate="handleCalculate" />
        </div>
        <div>
          <QuoteResult 
            v-if="currentQuote" 
            :result="currentQuote" 
            @save="handleSaveQuote"
          />
          <div v-else class="bg-white rounded-lg border border-gray-300 p-6 h-full flex items-center justify-center">
            <p class="text-gray-400 text-center">
              Enter quote details and click Apply to see results
            </p>
          </div>
        </div>
      </div>

      <div>
        <SavedQuotes 
          :quotes="savedQuotes" 
          @viewModal="handleViewModal"
          @delete="handleDeleteQuote"
        />
      </div>
    </main>

    <QuoteModal 
      :isOpen="quoteModal.isOpen" 
      :quote="quoteModal.quote" 
      @close="handleCloseModal"
      @delete="handleModalDelete"
    />

    <ConfirmModal 
      :isOpen="confirmModal.isOpen"
      :title="confirmModal.title"
      :message="confirmModal.message"
      @confirm="handleConfirmDelete"
      @cancel="handleCancelDelete"
    />
    
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import QuoteForm from './components/QuoteForm.vue';
import QuoteResult from './components/QuoteResult.vue';
import SavedQuotes from './components/SavedQuotes.vue';
import QuoteModal from './components/QuoteModal.vue';
import ConfirmModal from './components/ConfirmModal.vue';
import ToastContainer from './components/ToastContainer.vue';
import { useQuoteManager } from './composables/useQuoteManager';

const {
  currentQuote,
  savedQuotes,
  quoteModal,
  confirmModal,
  isLoading,
  handleCalculate,
  handleSaveQuote,
  handleViewModal,
  handleCloseModal,
  handleModalDelete,
  handleDeleteQuote,
  handleConfirmDelete,
  handleCancelDelete
} = useQuoteManager();
</script>