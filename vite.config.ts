import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.API_BASE_URL': JSON.stringify(env.API_BASE_URL),
      'process.env.API_BOOKINGS': JSON.stringify(env.API_BOOKINGS),
      'process.env.API_VENUES': JSON.stringify(env.API_VENUES),
      'process.env.API_ALL_PROFILES': JSON.stringify(env.API_ALL_PROFILES),
      'process.env.API_LOGIN': JSON.stringify(env.API_LOGIN),
      'process.env.API_REGISTER': JSON.stringify(env.API_REGISTER),
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
    plugins: [react()],
  }
})
