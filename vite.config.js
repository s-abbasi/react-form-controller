import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

window.LOG = (value) => {
    if (process.env.NODE_ENV !== 'test') {
        // eslint-disable-next-line no-console
        console.log(value);
    }
};
export default defineConfig({ plugins: [react()] });
