# Deployment Guide

This guide provides step-by-step instructions for deploying the RICS Home Survey Report Writer to various hosting platforms.

## Table of Contents
- [Building for Production](#building-for-production)
- [GitHub Deployment](#github-deployment)
- [Traditional Web Hosting](#traditional-web-hosting)
- [Troubleshooting](#troubleshooting)

## Building for Production

Before deploying, you must create a production build:

```bash
# Navigate to project directory
cd c:\Users\Ross\.gemini\antigravity\playground\ionized-station

# Install dependencies (if not already done)
npm install

# Create production build
npm run build
```

This creates a `dist/` folder containing all optimized files ready for deployment.

## GitHub Deployment

### Option 1: GitHub Pages

1. **Initialize Git Repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Create a new repository (e.g., `rics-report-writer`)
   - Don't initialize with README (you already have one)

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/yourusername/rics-report-writer.git
   git branch -M main
   git push -u origin main
   ```

4. **Configure GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` → `/dist` folder
   - Save

5. **Update Vite Config** (if using GitHub Pages subdirectory):
   - Edit `vite.config.ts`
   - Add: `base: '/rics-report-writer/'`
   - Rebuild and push changes

### Option 2: GitHub with Manual Deployment

1. Build the project locally
2. Push source code to `main` branch
3. Create a `gh-pages` branch
4. Copy `dist/` contents to `gh-pages` branch root
5. Push `gh-pages` branch
6. Configure GitHub Pages to serve from `gh-pages` branch

## Traditional Web Hosting

### For cPanel / Shared Hosting

1. **Build the Project**:
   ```bash
   npm run build
   ```

2. **Prepare Files**:
   - Locate the `dist/` folder in your project
   - This contains all files needed for deployment

3. **Upload via FTP/File Manager**:
   - Connect to your hosting via FTP (FileZilla, WinSCP, etc.)
   - Navigate to your public directory (usually `public_html/` or `www/`)
   - Upload ALL files from the `dist/` folder
   - Ensure `.htaccess` file is uploaded (see below)

4. **Create .htaccess File** (for Apache servers):
   
   Create a file named `.htaccess` in your public directory with this content:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

5. **Verify Deployment**:
   - Visit your domain (e.g., https://www.surveyingpeople.co.uk)
   - The application should load
   - Test navigation between sections
   - Verify localStorage persistence works

### For Subdirectory Installation

If installing in a subdirectory (e.g., `yourdomain.com/reports/`):

1. **Update Vite Config**:
   - Edit `vite.config.ts`
   - Change `base: '/'` to `base: '/reports/'`
   - Rebuild: `npm run build`

2. **Update .htaccess**:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /reports/
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /reports/index.html [L]
   </IfModule>
   ```

3. Upload to `/public_html/reports/` directory

### For Nginx Servers

Add this to your Nginx configuration:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

## File Checklist

After uploading, verify these files exist on your server:

- ✅ `index.html` - Main HTML file
- ✅ `assets/` - Folder with CSS and JS files
- ✅ `.htaccess` - Routing configuration (Apache only)
- ✅ `vite.svg` or other assets from public folder

## Troubleshooting

### Blank Page After Deployment

**Cause**: Incorrect base path in Vite config

**Solution**:
1. Check `vite.config.ts` - ensure `base` matches your deployment path
2. Rebuild: `npm run build`
3. Re-upload `dist/` contents

### 404 Errors on Refresh

**Cause**: Server not configured for client-side routing

**Solution**:
- **Apache**: Ensure `.htaccess` file is uploaded and mod_rewrite is enabled
- **Nginx**: Add `try_files` directive to configuration
- **Other**: Configure server to serve `index.html` for all routes

### Assets Not Loading

**Cause**: Incorrect base path or missing files

**Solution**:
1. Check browser console for 404 errors
2. Verify all files from `dist/` were uploaded
3. Check `base` path in `vite.config.ts`
4. Clear browser cache

### localStorage Not Working

**Cause**: Browser privacy settings or HTTPS issues

**Solution**:
- Ensure site is served over HTTPS
- Check browser privacy/cookie settings
- Test in different browser

## Post-Deployment Verification

After deployment, test these features:

1. ✅ Dashboard loads correctly
2. ✅ Can create new reports
3. ✅ Can navigate between sections
4. ✅ Auto-fill dropdowns work
5. ✅ Photos can be uploaded
6. ✅ Reports save and persist after refresh
7. ✅ PDF export works
8. ✅ Template manager functions

## Updating the Application

To deploy updates:

1. Make changes to source code
2. Test locally: `npm run dev`
3. Build: `npm run build`
4. Upload new `dist/` contents to server (overwrite existing files)
5. Clear browser cache and test

## Security Notes

- All data is stored client-side (localStorage)
- No sensitive data is transmitted to servers
- HTTPS is recommended for production
- Regular backups of localStorage recommended

## Support

For deployment issues, check:
- Browser console for errors
- Server error logs
- Hosting provider documentation

---

**Last Updated**: December 2025
