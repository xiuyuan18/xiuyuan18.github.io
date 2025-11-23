import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
export { DATA } from './constants';

interface RenderOptions {
    path: string;
    base?: string;
}

export function render({ path, base }: RenderOptions) {
    return ReactDOMServer.renderToString(
        <React.StrictMode>
            <StaticRouter location={path} basename={base}>
                <App />
            </StaticRouter>
        </React.StrictMode>
    );
}