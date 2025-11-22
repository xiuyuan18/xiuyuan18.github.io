// 项目根目录 /tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    // 配置需要 Tailwind 处理的文件（Vite 项目通常是 src 下的 HTML/JS/TS/JSX/TSX）
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,css}", // 覆盖 src 下所有相关文件
    ],
    theme: {
        extend: {
            // 自定义字体（对应你之前的配置）
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // 无衬线字体
                serif: ['Playfair Display', 'serif'], // 衬线字体
            },
            // 自定义颜色（academic 系列）
            colors: {
                academic: {
                    50: '#f8f9fa',
                    100: '#e9ecef',
                    200: '#dee2e6',
                    300: '#ced4da',
                    400: '#adb5bd',
                    500: '#6c757d',
                    600: '#495057',
                    700: '#343a40',
                    800: '#212529',
                    900: '#121416',
                    accent: '#0284c7',
                },
            },
        },
    },
    plugins: [], // 可选：添加 Tailwind 插件（如 forms、aspect-ratio 等）
};
