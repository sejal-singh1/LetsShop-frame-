import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
  proxy:{
'/api':'https://letsshop-backend-6.onrender.com',

  },
    
  },
  plugins: [react()],


  
  
})
