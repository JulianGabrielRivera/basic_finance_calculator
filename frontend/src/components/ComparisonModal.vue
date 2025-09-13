<template>
  <div v-if="isOpen" class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-content">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="text-xl font-semibold">
          Compare Quotes ({{ selectedQuotes.length }})
        </h2>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Modal Content -->
      <div class="p-6">
        <div
          v-if="selectedQuotes.length === 0"
          class="text-center py-10 text-gray-400"
        >
          No quotes selected for comparison
        </div>

        <div v-else class="space-y-6">
          <!-- Comparison Grid -->
          <div
            class="grid gap-6"
            :class="
              selectedQuotes.length === 1 ? 'grid-cols-1' : 'md:grid-cols-2'
            "
          >
            <div
              v-for="(quote, index) in selectedQuotes"
              :key="quote.id"
              class="card"
            >
              <h3 class="font-semibold text-lg mb-4">
                {{ quote.name || `Quote ${index + 1}` }}
              </h3>

              <!-- Quote Details Grid -->
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Monthly Payment:</span>
                  <strong class="text-green-600"
                    >${{ formatCurrency(quote.monthlyPayment || 0) }}</strong
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Down Payment:</span>
                  <span>${{ formatCurrency(quote.downPayment || 0) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Selling Price:</span>
                  <span>${{ formatCurrency(quote.sellingPrice || 0) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Loan Term:</span>
                  <span>{{ quote.loanTerm || 0 }} months</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Interest Rate:</span>
                  <span>{{ quote.interestRate || 0 }}%</span>
                </div>
                <div class="flex justify-between border-t pt-2">
                  <span class="text-gray-600">Total Payments:</span>
                  <strong
                    >${{ formatCurrency(quote.totalPayments || 0) }}</strong
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="modal-footer">
        <button @click="$emit('close')" class="btn-secondary">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Quote } from "../types/quote";
import { useFormatters } from "../composables/useFormatters";

const props = defineProps<{
  isOpen: boolean;
  selectedQuotes: Quote[];
}>();

const emit = defineEmits<{
  close: [];
}>();

const { formatNumber: formatCurrency } = useFormatters();
</script>
