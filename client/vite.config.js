import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// // https://vitejs.dev/config/
// export default defineConfig({
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3001',
//         secure: false,
//       },
//     },
//   },

//   plugins: [
//     react(),
    
//   ],
// })


export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:10000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
      },
    },
  },
  plugins: [react()],
})