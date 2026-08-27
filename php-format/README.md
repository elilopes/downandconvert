# Down&Convert - PHP Serverless & WebAssembly Adaptation

This folder contains the files adapted for a standard PHP server (like HostGator, cPanel, or any shared hosting without Node.js or VPS shell access).

## Features
- **Serverless & Client-Side Processing**: FFmpeg execution has been moved entirely to the browser using `FFmpeg.wasm`. No server CPU or memory is used for conversions, avoiding limits on shared hosting.
- **PHP Backend**: Express.js has been replaced with lightweight PHP scripts (`api/extract.php` and `api/proxy.php`).
- **No CORS Blocking**: The `proxy.php` fetches remote videos and safely streams them to the browser, bypassing CORS limits.
- **SharedArrayBuffer Support**: The included `index.php` adds the `Cross-Origin-Opener-Policy` and `Cross-Origin-Embedder-Policy` headers, which are **mandatory** for WebAssembly (`FFmpeg.wasm`) to function properly on a remote host.

## How to Deploy

1. Build your Vite/React project normally:
   ```bash
   npm run build
   ```

2. Upload the `dist/` folder contents to your PHP server.

3. Upload the files in this `php-format/` folder to the **same directory** on your PHP server:
   - Put `api/extract.php` and `api/proxy.php` into an `api/` folder at the root.
   - Use the `index.php` provided here as your main entry point (you'll need to update it to point to your compiled `dist/assets/...` JS and CSS files).

4. Done! The application will load and process media in the browser via WebAssembly, while using PHP to resolve and proxy external media.
