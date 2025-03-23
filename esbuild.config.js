const esbuild = require('esbuild');
const { copy } = require('esbuild-plugin-copy'); 

// ESBuild Configuration
esbuild.build({
  entryPoints: ['src/index.ts'],        // Adjust the entry point based on your project
  bundle: true,                         // Bundle all dependencies into one file
  outfile: 'public/js/bundle.js',       // Output file (adjust the path if needed)
  minify: false,                         // Minify the output (set to false if you don't want minification)
  sourcemap: true,                      // Generate source maps for easier debugging (optional)
  platform: 'browser',                  // Specify the platform (browser or node)
  loader: {
    '.ts': 'ts',                        // Use TypeScript loader for .ts files
  },
  plugins: [
    copy({
      assets: [
        {
          from: 'src/assets/*',      // Source folder (your assets)
          to: '../assets', // Destination folder (in public/assets)
        },
      ],
    }),
  ],
}).catch(() => process.exit(1));        // Ensure the process exits on error
