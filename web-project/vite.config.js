import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
// Remova esta linha se você não instalou o plugin electron
// import electron from 'vite-plugin-electron';

export default defineConfig({
  plugins: [
    vue(),
    // Descomente estas linhas se você instalou o plugin electron
    // electron({
    //   entry: 'electron/main.js',
    // }),
  ],
  base: './', // Importante para o Electron funcionar corretamente
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@views': path.resolve(__dirname, './src/views'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@utils': path.resolve(__dirname, './src/utils')
    }
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    target: 'es2015',
    // Garante que as importações absolutas serão resolvidas corretamente
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
        }
      }
    },
    // Alternativa ao terser para evitar o erro
    minify: 'esbuild',
    sourcemap: false
  }
}); 