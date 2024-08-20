import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          // إضافة تقسيمات أخرى حسب الحاجة
          if (id.includes('src/components')) {
            return 'components';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // زيادة الحد الأقصى إلى 1000 كيلوبايت
  },
});
