import { ref } from 'vue';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration: number;
}

const toasts = ref<Toast[]>([]);
let toastIdCounter = 0;

export const useToast = () => {
  const addToast = (type: Toast['type'], message: string, duration = 4000) => {
    const id = `toast-${++toastIdCounter}`;
    const toast: Toast = { id, type, message, duration };
    
    toasts.value.push(toast);
    
    // Auto-remove after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);
    
    return id;
  };
  
  const removeToast = (id: string) => {
    const index = toasts.value.findIndex(toast => toast.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  };
  
  const showSuccess = (message: string, duration?: number) => 
    addToast('success', message, duration);
    
  const showError = (message: string, duration?: number) => 
    addToast('error', message, duration);
    
  
  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
  };
};