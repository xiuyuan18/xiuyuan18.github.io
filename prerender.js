import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

async function prerender() {
    // 1. Read the index.html template from the client build
    const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8');

    // 2. Load the server entry function AND the data
    const { render, DATA } = await import('./dist/server/entry-server.js');

    // 3. Define base routes
    const routesToPrerender = ['/', '/publications', '/teaching', '/blog'];

    // 4. Dynamically add blog post routes
    DATA.blog.forEach(post => {
        // Ensure we handle the slug correctly. 
        // If your slug has spaces "My Post", the URL is /blog/My%20Post
        // We need to create a folder named "My Post" (or handle encoding depending on host)
        // Ideally, slugs should be kebab-case (my-post), but this supports your current setup.
        routesToPrerender.push(`/blog/${post.slug}`);
    });

    console.log(`Found ${DATA.blog.length} blog posts to prerender.`);

    // 5. Render each route
    for (const url of routesToPrerender) {
        // Render the app HTML for this URL
        const appHtml = render({ path: url, base: '/' });

        // Inject the app HTML into the template
        const html = template.replace(
            '<div id="root"></div>',
            `<div id="root">${appHtml}</div>`
        );

        // Determine output file path
        // URL: /blog/Logistic Linear Classification
        // File: dist/static/blog/Logistic Linear Classification/index.html

        // We decodeURI to ensure the folder name on disk matches the "human" readable name
        // which GitHub pages usually maps correctly.
        const relativePath = url === '/' ? 'index.html' : `${decodeURI(url).substring(1)}/index.html`;
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