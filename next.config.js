/** @type {import('next').NextConfig} */
const nextConfig = {
    // ...existing code...
    output: 'export',
    // Optional: Change links /me -> /me/ and emit /me.html -> /me/index.html
    // trailingSlash: true,

    // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
    // skipTrailingSlashRedirect: true,

    // Optional: Change the output directory `out` -> `dist`
    distDir: 'dist',

    // If deploying to https://<USERNAME>.github.io/<REPO_NAME>/
    // Set basePath to '/<REPO_NAME>'
    // basePath: '/repo-name', 

    images: {
        unoptimized: true,
    },
    // ...existing code...
}

export default nextConfig
