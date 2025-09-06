<template>
  <div class="card">
    <h2 class="text-lg font-semibold mb-6">Saved Quotes</h2>
    
    <div v-if="quotes.length === 0" class="text-center py-10 text-gray-400">
      No saved quotes yet
    </div>

    <div v-else class="space-y-4">
      <div 
        v-for="quote in quotes" 
        :key="quote.id" 
        class="flex justify-between items-center py-3 border-b border-gray-200 last:border-0"
      >
        <div>
          <h3 class="font-semibold text-base">{{ quote.name || 'Unnamed Quote' }}</h3>
          <div class="flex gap-4 mt-1">
            <span class="text-sm">Payment: <strong>${{ formatNumber(quote.monthlyPayment) }}</strong></span>
            <span class="text-sm">Out of Pocket: <strong>${{ formatNumber(quote.downPayment) }}</strong></span>
          </div>
        </div>
        <div class="flex gap-2">
          <button 
            @click="$emit('viewModal', quote)" 
            class="btn-primary text-xs py-1.5 px-4"
          >
            View
          </button>
          <button 
            @click="$emit('delete', quote.id)" 
            class="btn-danger text-xs py-1.5"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Quote } from '../types/quote';
import { useFormatters } from '../composables/useFormatters';

defineProps<{
  quotes: Quote[]
}>();

defineEmits<{
  viewModal: [quote: Quote]
  delete: [id: string]
}>();

const { formatNumber } = useFormatters();
</script>