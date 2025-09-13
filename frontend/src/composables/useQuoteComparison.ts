import type { Quote } from "../types/quote";
import {useModals} from "./useModals";
import { ref } from 'vue';
 


export const useQuoteComparison = () => {
const selectedQuotes = ref<Quote[]>([]);
const { openComparisonModal, comparisonModal,closeComparisonModal } = useModals();

const isSelected = (quote: Quote) => {
    return selectedQuotes.value.some(q => q.id === quote.id);
  };
const toggleSelection = (quote:Quote)=>{

    const index = selectedQuotes.value.findIndex(q => q.id === quote.id);
    if(index> -1){
        selectedQuotes.value.splice(index,1);
    }
    else{
        selectedQuotes.value.push(quote);
    }
}


const handleComparisonViewModal = (selectedQuotes: Quote[]) => {
    openComparisonModal(selectedQuotes);
  };

return{
    selectedQuotes,handleComparisonViewModal,comparisonModal,toggleSelection,isSelected,closeComparisonModal
};
};