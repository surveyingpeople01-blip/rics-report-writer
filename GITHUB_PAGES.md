# GitHub Pages Deployment Guide

## Quick Setup for GitHub Pages

Your project is now configured to deploy to GitHub Pages!

### What Changed
- ✅ `dist` folder is no longer ignored by Git
- ✅ Production build is ready in `dist/` folder
- ✅ All files are ready to commit

### Step-by-Step Deployment

#### 1. Install Git (if needed)
Download from: https://git-scm.com/download/win

#### 2. Initialize and Commit

Open **Command Prompt** or **Git Bash** in your project folder:

```bash
cd c:\Users\Ross\.gemini\antigravity\playground\ionized-station

# Initialize Git
git init

# Add all files (including dist folder)
git add .

# Create first commit
git commit -m "Initial commit with production build"

# Rename branch to main
git branch -M main
```

#### 3. Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `rics-report-writer`
3. Description: "Professional RICS Home Survey Report Writer"
4. Choose **Public** (required for free GitHub Pages)
5. **DO NOT** check "Initialize with README"
6. Click "Create repository"

#### 4. Push to GitHub

Replace `YOUR-USERNAME` with your GitHub username:

```bash
# Add remote repository
git remote add origin https://github.com/YOUR-USERNAME/rics-report-writer.git

# Push to GitHub
git push -u origin main
```

#### 5. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under "Source":
   - Branch: Select `main`
   - Folder: Select `/dist`
   - Click **Save**

#### 6. Wait for Deployment

- GitHub will build and deploy your site (takes 1-2 minutes)
- You'll see a green checkmark when ready
- Your site will be at: `https://YOUR-USERNAME.github.io/rics-report-writer/`

### Important: Update Base Path

Since your app will be in a subdirectory, you need to update the base path:

1. **Edit `vite.config.ts`**:
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/rics-report-writer/', // Add this line
   })
   ```

2. **Rebuild**:
   ```bash
   npm run build
   ```

3. **Commit and push**:
   ```bash
   git add .
   git commit -m "Update base path for GitHub Pages"
   git push
   ```

### Verify Deployment

1. Visit: `https://YOUR-USERNAME.github.io/rics-report-writer/`
2. Your RICS Report Writer should load
3. Test all features to ensure they work

### Updating Your Site

When you make changes:

```bash
# Make your code changes
# ...

# Rebuild
npm run build

# Commit and push
git add .
git commit -m "Description of changes"
git push
```

GitHub Pages will automatically update within 1-2 minutes.

### Alternative: GitHub Desktop

If you prefer a GUI:

1. Download **GitHub Desktop**: https://desktop.github.com/
2. Install and sign in
3. File → Add Local Repository
4. Select: `c:\Users\Ross\.gemini\antigravity\playground\ionized-station`
5. Click "Publish repository"
6. Check "Keep this code private" if desired (but Pages requires Public for free tier)
7. Click "Publish Repository"
8. Follow steps 5-6 above to enable GitHub Pages

### Troubleshooting

**Blank page after deployment:**
- Make sure you updated `base` in `vite.config.ts`
- Rebuild with `npm run build`
- Commit and push the new dist folder

**404 errors:**
- Verify GitHub Pages is set to serve from `main` branch, `/dist` folder
- Check that dist folder is committed (not in .gitignore)

**Changes not showing:**
- Wait 1-2 minutes for GitHub to rebuild
- Hard refresh browser (Ctrl + Shift + R)
- Check repository Actions tab for build status

### Custom Domain (Optional)

To use your own domain (e.g., reports.surveyingpeople.co.uk):

1. In GitHub Pages settings, add your custom domain
2. Update your DNS settings to point to GitHub Pages
3. Follow GitHub's custom domain guide

---

**Your site will be live at:**
`https://YOUR-USERNAME.github.io/rics-report-writer/`

Replace `YOUR-USERNAME` with your actual GitHub username!
