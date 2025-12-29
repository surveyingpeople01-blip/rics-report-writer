# Traditional Web Hosting Deployment Guide

## Quick Start

Your RICS Report Writer is ready to upload to any traditional web hosting service (cPanel, FTP, etc.).

## Files to Upload

**Location on your computer:**
```
c:\Users\Ross\.gemini\antigravity\playground\ionized-station\dist\
```

**Upload ALL files from the `dist` folder:**
- ✅ `index.html`
- ✅ `assets` folder (entire folder with all contents)
- ✅ `.htaccess` (if using Apache server)
- ✅ `logo.jpg`
- ✅ `vite.svg`

## Step-by-Step Upload Instructions

### Method 1: cPanel File Manager

1. **Log in to cPanel**
2. **Open File Manager**
3. **Navigate to** `public_html` (or your domain's root directory)
4. **Click Upload**
5. **Select all files** from `c:\Users\Ross\.gemini\antigravity\playground\ionized-station\dist\`
6. **Upload** and wait for completion
7. **Visit your domain** - your app should load immediately!

### Method 2: FTP (FileZilla, WinSCP, etc.)

1. **Open your FTP client**
2. **Connect to your hosting**:
   - Host: Your domain or server IP
   - Username: Your FTP username
   - Password: Your FTP password
3. **Navigate to** `public_html` or `/www` or your domain root
4. **Drag and drop** all files from the `dist` folder
5. **Wait for upload** to complete
6. **Visit your domain**

### Method 3: Subdirectory Installation

If installing in a subdirectory (e.g., `yourdomain.com/reports/`):

1. **Create folder** in `public_html` (e.g., `reports`)
2. **Upload all files** to that folder
3. **Visit**: `yourdomain.com/reports/`

**Note:** The current build is configured for root directory. It will work in subdirectories too since we're using relative paths!

## File Structure After Upload

Your hosting should look like this:
```
public_html/
├── index.html
├── assets/
│   ├── index-BFeG60Hz.js
│   ├── index-DO1aHNo9.css
│   └── purify.es-Bzr520pe.js
├── .htaccess
├── logo.jpg
└── vite.svg
```

## Important Notes

### ✅ Already Configured For You:
- **Relative paths** - Works in root or subdirectory
- **Client-side routing** - `.htaccess` file included for Apache
- **No database needed** - All data stored in browser localStorage
- **No PHP required** - Pure HTML/CSS/JavaScript

### Server Requirements:
- **Any static file hosting** (Apache, Nginx, IIS, etc.)
- **No special software** needed
- **HTTPS recommended** (but not required)

### For Nginx Servers:

If your host uses Nginx instead of Apache, add this to your server config:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

## Testing Your Deployment

After uploading, visit your domain and verify:

1. ✅ Dashboard loads
2. ✅ Can create new reports
3. ✅ Can navigate between sections
4. ✅ Auto-fill dropdowns work
5. ✅ Photos can be uploaded
6. ✅ Reports save after page refresh
7. ✅ PDF export works

## Troubleshooting

### Blank Page
- **Check**: All files uploaded correctly
- **Check**: `index.html` is in the root directory
- **Solution**: Re-upload all files

### 404 Errors When Navigating
- **Cause**: Server not configured for client-side routing
- **Solution**: Ensure `.htaccess` file is uploaded (Apache)
- **Solution**: Configure Nginx (see above)

### Assets Not Loading
- **Check**: `assets` folder uploaded completely
- **Check**: File permissions (should be 644 for files, 755 for folders)

### Reports Not Saving
- **Cause**: Browser privacy settings
- **Solution**: Ensure cookies/localStorage enabled
- **Solution**: Use HTTPS if possible

## Updating Your Site

When you make changes:

1. **Rebuild** on your computer: `npm run build`
2. **Delete old files** from hosting
3. **Upload new files** from `dist` folder
4. **Clear browser cache** and test

## Your Deployment Checklist

- [ ] All files from `dist` folder uploaded
- [ ] `index.html` in root directory
- [ ] `assets` folder uploaded completely
- [ ] `.htaccess` uploaded (Apache servers)
- [ ] Visited site and verified it loads
- [ ] Tested creating a report
- [ ] Tested navigation between sections
- [ ] Verified reports save after refresh

---

**Your files are ready to upload from:**
`c:\Users\Ross\.gemini\antigravity\playground\ionized-station\dist\`

**Just upload everything in that folder to your web hosting and you're done!**
