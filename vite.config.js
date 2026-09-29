import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

/* Open edX serves each upload at /asset-v1:<course key>+type@asset+block@<name>.
   That is one path segment, so a relative url() in the course-wide stylesheet
   cannot reach a sibling font. For the Open edX build, set UL_FONT_BASE to that
   prefix and the shipped CSS points at the uploaded fonts. Left unset, the
   gallery, the prototype and the Vercel build keep /fonts/. */
const fontBase = process.env.UL_FONT_BASE;
const rebaseFonts = {
  name: 'rebase-fonts',
  apply: 'build',
  generateBundle(_, bundle) {
    if (!fontBase) return;
    for (const file of Object.values(bundle)) {
      if (file.type !== 'asset' || !file.fileName.endsWith('.css')) continue;
      file.source = String(file.source).replace(/url\((["']?)\/fonts\//g, (_m, q) => `url(${q}${fontBase}`);
    }
  },
};

export default defineConfig({
  plugins: [rebaseFonts],
  build: {
    // Stable filename: this asset is uploaded to Open edX Files & Uploads and
    // referenced as /static/uber-learn.css. A content hash would break it on
    // every rebuild.
    rollupOptions: {
      input: {
        gallery: resolve(projectRoot, 'index.html'),
        course: resolve(projectRoot, 'course.html'),
      },
      output: {
        assetFileNames: (asset) => {
          if (asset.name === 'course.css') return 'course.[ext]';
          if (asset.name === 'index.css') return 'uber-learn.[ext]';
          return 'assets/[name]-[hash].[ext]';
        },
      },
    },
  },
  server: { host: true },
});
