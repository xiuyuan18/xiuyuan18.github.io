import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import ts from 'typescript';

const projectRoot = process.cwd();
const constantsPath = path.join(projectRoot, 'src', 'constants.ts');
const source = fs.readFileSync(constantsPath, 'utf8');
const transpiled = ts.transpileModule(source, {
    compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
    },
    reportDiagnostics: true,
});

const errors = transpiled.diagnostics?.filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error) ?? [];
assert.equal(errors.length, 0, 'src/constants.ts should transpile without errors');

const moduleUrl = `data:text/javascript;base64,${Buffer.from(transpiled.outputText).toString('base64')}`;
const { DATA } = await import(moduleUrl);

function assertUnique(values, label) {
    assert.equal(new Set(values).size, values.length, `${label} must be unique`);
}

function publicAssetPath(url) {
    if (!url?.startsWith('/')) return null;
    return path.join(projectRoot, 'public', url.slice(1));
}

test('content IDs and blog slugs are unique', () => {
    for (const [name, items] of Object.entries({
        news: DATA.news,
        publications: DATA.publications,
        teaching: DATA.teaching,
        awards: DATA.awards,
        blog: DATA.blog,
    })) {
        assertUnique(items.map((item) => item.id), `${name} IDs`);
    }
    assertUnique(DATA.blog.map((post) => post.slug), 'blog slugs');
});

test('local profile and publication assets exist', () => {
    for (const url of [DATA.profile.image, DATA.profile.cv]) {
        const assetPath = publicAssetPath(url);
        if (assetPath) assert.ok(fs.existsSync(assetPath), `Missing asset: ${url}`);
    }

    for (const publication of DATA.publications) {
        for (const url of [publication.teaser, publication.teaserImage]) {
            const assetPath = publicAssetPath(url);
            if (assetPath) assert.ok(fs.existsSync(assetPath), `Missing asset: ${url}`);
        }
    }
});

test('every blog entry has a safe slug and matching body file', () => {
    for (const post of DATA.blog) {
        assert.match(post.slug, /^[A-Za-z0-9_-]+$/, `Unsafe blog slug: ${post.slug}`);
        const extension = post.format === 'html' ? 'html' : 'md';
        const bodyPath = path.join(projectRoot, 'public', 'assets', 'posts', `${post.slug}.${extension}`);
        assert.ok(fs.existsSync(bodyPath), `Missing blog body: ${bodyPath}`);
    }
});

test('enabled sections contain publishable content', () => {
    if (DATA.config.showPublicationsPage) assert.ok(DATA.publications.length > 0, 'Publications page is enabled but empty');
    if (DATA.config.showTeachingPage) assert.ok(DATA.teaching.length > 0, 'Teaching page is enabled but empty');
    if (DATA.config.showBlogPage) assert.ok(DATA.blog.length > 0, 'Blog page is enabled but empty');
});
