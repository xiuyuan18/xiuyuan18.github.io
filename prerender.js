import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

// Define the routes you want to pre-render
const routesToPrerender = ['/', '/publications', '/teaching', '/blog'];

async function prerender() {
    // 1. Read the index.html template from the client build
    const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8');

    // 2. Load the server entry function
    const { render } = await import('./dist/server/entry-server.js');

    // 3. Render each route
    for (const url of routesToPrerender) {
        // Render the app HTML for this URL
        // We assume base is '/' for generation, handling subdirectory deployment via vite config if needed
        const appHtml = render({ path: url, base: '/' }); // Base handling is typically managed by the build output path context

        // Inject the app HTML into the template
        const html = template.replace(
            '<div id="root"></div>',
            `<div id="root">${appHtml}</div>`
        );

        // Determine output file path
        // e.g., '/' -> 'dist/static/index.html'
        // '/publications' -> 'dist/static/publications/index.html'
        const relativePath = url === '/' ? 'index.html' : `${url.substring(1)}/index.html`;
        const filePath = toAbsolute(`dist/static/${relativePath}`);
        const dir = path.dirname(filePath);

        // Create directory if it doesn't exist
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Write the file
        fs.writeFileSync(filePath, html);
        console.log(`Pre-rendered: ${relativePath}`);
    }
}

prerender().catch((e) => {
    console.error(e);
    process.exit(1);
});