<template>
  <div class="card h-full">
    <h2 class="text-lg font-semibold mb-6">Result</h2>
    
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <span class="text-sm">Taxes:</span>
        <span class="text-sm font-medium">${{ formatNumber(result.totalTaxes) }}</span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-sm">Base Loan Amount:</span>
        <span class="text-sm font-medium">${{ formatNumber(baseLoanAmount) }}</span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-sm">Interest:</span>
        <span class="text-sm font-medium">${{ formatNumber(result.totalInterest) }}</span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-sm">Total Loan Amount:</span>
        <span class="text-sm font-medium">${{ formatNumber(result.loanAmount) }}</span>
      </div>

      <div class="flex justify-between items-center pt-2">
        <span class="text-sm font-semibold">Payment:</span>
        <span class="text-lg font-bold">${{ formatNumber(result.monthlyPayment) }}</span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-sm font-semibold">Out Of Pocket:</span>
        <span class="text-sm font-bold">${{ formatNumber(result.downPayment) }}</span>
      </div>

      <div class="pt-4 space-y-3">
        <div>
          <label for="quoteName" class="block text-sm mb-2">Quote Name:</label>
          <input
            id="quoteName"
            v-model="quoteName"
            type="text"
            placeholder="2025 Ford Escape"
            class="input-field"
          />
        </div>

        <div class="flex justify-end">
          <button 
            @click="handleSave" 
            class="btn-primary"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Quote } from '../types/quote';
import { useFormatters } from '../composables/useFormatters';
import { useToast } from '../composables/useToast';
import { MESSAGES } from '../constants/defaults';

const props = defineProps<{
  result: Quote
}>();

const emit = defineEmits<{
  save: [name: string]
}>();

const quoteName = ref('');
const { formatNumber } = useFormatters();
const { showError } = useToast();

const baseLoanAmount = computed(() => {
  return props.result.sellingPrice - props.result.downPayment;
});

const handleSave = () => {
  if (quoteName.value.trim()) {
    emit('save', quoteName.value);
    quoteName.value = '';
  } else {
    showError(MESSAGES.QUOTE_NAME_REQUIRED);
  }
};
</script>