import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// GitHub Pages 저장소 이름이 다르면 배포할 때 VITE_BASE_PATH=/저장소명/ 을 설정하세요.
export default defineConfig({plugins:[react()],base:process.env.VITE_BASE_PATH || './'});
