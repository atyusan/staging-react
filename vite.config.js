import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const port = Number(env.VITE_DEV_SERVER_PORT) || 5173;
  const proxyTarget = env.VITE_API_PROXY_TARGET || 'http://localhost:4001';

  return {
    plugins: [react()],
    server: {
      port,
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
        },
      },
    },
  };
});
