<template>
  <div 
    v-if="isOpen" 
    class="modal-backdrop"
    @click.self="$emit('close')"
  >
    <div class="modal-content">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="text-xl font-semibold">{{ quote.name }}</h2>
        <button 
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Modal Content -->
      <div class="p-6">
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Input Details -->
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-800">Vehicle Details</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-sm text-gray-600">Vehicle Cost:</span>
                <span class="text-sm font-medium">${{ formatNumber(quote.vehicleCost) }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-sm text-gray-600">Profit:</span>
                <span class="text-sm font-medium">${{ formatNumber(quote.profit) }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-sm text-gray-600">Selling Price:</span>
                <span class="text-sm font-medium">${{ formatNumber(quote.sellingPrice) }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-sm text-gray-600">Out of Pocket:</span>
                <span class="text-sm font-medium">${{ formatNumber(quote.downPayment) }}</span>
              </div>
            </div>

            <h3 class="text-lg font-semibold mb-4 mt-6 text-gray-800">Loan Terms</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-sm text-gray-600">Loan Term:</span>
                <span class="text-sm font-medium">{{ quote.loanTerm }} months</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-sm text-gray-600">Interest Rate:</span>
                <span class="text-sm font-medium">{{ quote.interestRate }}%</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-sm text-gray-600">Tax Rate:</span>
                <span class="text-sm font-medium">{{ quote.taxRate }}%</span>
              </div>
            </div>
          </div>

          <!-- Calculation Results -->
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-800">Payment Breakdown</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-sm text-gray-600">Base Loan Amount:</span>
                <span class="text-sm font-medium">${{ formatNumber(baseLoanAmount) }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-sm text-gray-600">Total Taxes:</span>
                <span class="text-sm font-medium">${{ formatNumber(quote.totalTaxes) }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-sm text-gray-600">Total Loan Amount:</span>
                <span class="text-sm font-medium">${{ formatNumber(quote.loanAmount) }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-sm text-gray-600">Total Interest:</span>
                <span class="text-sm font-medium">${{ formatNumber(quote.totalInterest) }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-sm text-gray-600">Total of Payments:</span>
                <span class="text-sm font-medium">${{ formatNumber(quote.totalPayments) }}</span>
              </div>
            </div>

            <!-- Monthly Payment Highlight -->
            <div class="bg-gray-50 rounded-lg p-4 mt-6">
              <div class="flex justify-between items-center">
                <span class="text-lg font-semibold text-gray-800">Monthly Payment:</span>
                <span class="text-2xl font-bold text-gray-900">${{ formatNumber(quote.monthlyPayment) }}</span>
              </div>
            </div>

            <!-- Quote Info -->
            <div class="mt-6 pt-4 border-t border-gray-200">
              <div class="flex justify-end items-center text-xs text-gray-500">
                <span>Created: {{ formatDate(quote.createdAt) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="modal-footer">
        <button 
          @click="$emit('close')"
          class="btn-secondary"
        >
          Close
        </button>
        <button 
          @click="$emit('delete', quote.id)"
          class="btn-danger flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete Quote
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Quote } from '../types/quote';
import { useFormatters } from '../composables/useFormatters';

const props = defineProps<{
  isOpen: boolean;
  quote: Quote | null;
}>();

const emit = defineEmits<{
  close: []
  delete: [id: string]
}>();

const { formatNumber, formatDate } = useFormatters();

const baseLoanAmount = computed(() => {
  if (!props.quote) return 0;
  return props.quote.sellingPrice - props.quote.downPayment;
});
</script>