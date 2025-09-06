<template>
  <div class="card h-full">
    <h2 class="text-lg font-semibold mb-6">Finance Quote</h2>
    <form @submit.prevent="handleCalculate" class="space-y-5">
      <div class="flex items-center">
        <label for="cost" class="w-32 text-sm">Cost:</label>
        <div class="flex-1 relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
          <input
            id="cost"
            v-model.number="form.vehicleCost"
            type="number"
            step="0.01"
            @input="updateSellingPrice"
            class="input-field-with-icon"
            required
          />
        </div>
      </div>

      <div class="flex items-center">
        <label for="profit" class="w-32 text-sm">Profit:</label>
        <div class="flex-1 relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
          <input
            id="profit"
            v-model.number="form.profit"
            type="number"
            step="0.01"
            @input="updateSellingPrice"
            class="input-field-with-icon"
          />
        </div>
      </div>

      <div class="flex items-center">
        <label for="sellingPrice" class="w-32 text-sm">Selling Price:</label>
        <div class="flex-1 relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
          <input
            id="sellingPrice"
            v-model.number="form.sellingPrice"
            type="number"
            step="0.01"
            @input="updateProfit"
            class="input-field-with-icon"
            required
          />
        </div>
      </div>

      <div class="flex items-center">
        <label for="term" class="w-32 text-sm">Term:</label>
        <div class="flex-1 relative">
          <input
            id="term"
            v-model.number="form.loanTerm"
            type="number"
            :min="VALIDATION_LIMITS.LOAN_TERM.MIN"
            :max="VALIDATION_LIMITS.LOAN_TERM.MAX"
            class="input-field"
            required
          />
          <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">Months</span>
        </div>
      </div>

      <div class="flex items-center">
        <label for="rate" class="w-32 text-sm">Rate:</label>
        <div class="flex-1 relative">
          <input
            id="rate"
            v-model.number="form.interestRate"
            type="number"
            step="0.01"
            :min="VALIDATION_LIMITS.INTEREST_RATE.MIN"
            :max="VALIDATION_LIMITS.INTEREST_RATE.MAX"
            class="input-field"
            required
          />
          <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
        </div>
      </div>

      <div class="flex items-center">
        <label for="downPayment" class="w-32 text-sm">Out Of Pocket:</label>
        <div class="flex-1 relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
          <input
            id="downPayment"
            v-model.number="form.downPayment"
            type="number"
            step="0.01"
            :min="VALIDATION_LIMITS.DOWN_PAYMENT.MIN"
            placeholder="0"
            class="input-field-with-icon"
          />
        </div>
      </div>

      <div class="flex items-center">
        <label for="taxRate" class="w-32 text-sm">Tax Rate:</label>
        <div class="flex-1 relative">
          <input
            id="taxRate"
            v-model.number="form.taxRate"
            type="number"
            step="0.01"
            :min="VALIDATION_LIMITS.TAX_RATE.MIN"
            :max="VALIDATION_LIMITS.TAX_RATE.MAX"
            class="input-field"
            required
          />
          <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
        </div>
      </div>

      <div class="flex justify-end mt-6">
        <button 
          type="submit" 
          class="btn-primary"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Apply
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { QuoteInput } from '../types/quote';
import { DEFAULT_QUOTE_VALUES, VALIDATION_LIMITS } from '../constants/defaults';

const emit = defineEmits<{
  calculate: [quote: QuoteInput]
}>();

const form = reactive<QuoteInput>({
  vehicleCost: DEFAULT_QUOTE_VALUES.VEHICLE_COST,
  profit: DEFAULT_QUOTE_VALUES.PROFIT,
  sellingPrice: DEFAULT_QUOTE_VALUES.SELLING_PRICE,
  downPayment: DEFAULT_QUOTE_VALUES.DOWN_PAYMENT,
  loanTerm: DEFAULT_QUOTE_VALUES.LOAN_TERM,
  interestRate: DEFAULT_QUOTE_VALUES.INTEREST_RATE,
  taxRate: DEFAULT_QUOTE_VALUES.TAX_RATE,
});

const updateSellingPrice = () => {
  form.sellingPrice = form.vehicleCost + form.profit;
};

const updateProfit = () => {
  form.profit = form.sellingPrice - form.vehicleCost;
};

const handleCalculate = () => {
  // Ensure downPayment is a number, default to 0 if invalid
  const formData = {
    ...form,
    downPayment: Number(form.downPayment) || 0
  };
  emit('calculate', formData);
};
</script>