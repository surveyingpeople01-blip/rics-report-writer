# Build Troubleshooting Guide

## Common Build Issues and Solutions

### Issue 1: PowerShell Execution Policy Error

**Error Message:**
```
npm.ps1 cannot be loaded because running scripts is disabled on this system
```

**Solutions:**

**Option A: Use Command Prompt Instead**
1. Press `Win + R`
2. Type `cmd` and press Enter
3. Navigate to project:
   ```cmd
   cd c:\Users\Ross\.gemini\antigravity\playground\ionized-station
   npm run build
   ```

**Option B: Fix PowerShell Policy**
1. Open PowerShell as Administrator (Right-click → Run as Administrator)
2. Run:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. Type `Y` and press Enter
4. Try build again:
   ```powershell
   cd c:\Users\Ross\.gemini\antigravity\playground\ionized-station
   npm run build
   ```

**Option C: Use Git Bash**
1. Open Git Bash in the project folder
2. Run:
   ```bash
   npm run build
   ```

### Issue 2: Node Modules Not Installed

**Error Message:**
```
Cannot find module 'vite'
```

**Solution:**
```bash
npm install
npm run build
```

### Issue 3: Out of Memory Error

**Error Message:**
```
JavaScript heap out of memory
```

**Solution:**
```bash
set NODE_OPTIONS=--max-old-space-size=4096
npm run build
```

### Issue 4: TypeScript Errors

**Error Message:**
```
TS2307: Cannot find module...
```

**Solution:**
```bash
# Clean install
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

### Issue 5: Permission Errors

**Error Message:**
```
EACCES: permission denied
```

**Solution:**
1. Close any programs that might be using the files (VS Code, etc.)
2. Run Command Prompt as Administrator
3. Try build again

## Step-by-Step Build Process

### Method 1: Command Prompt (Recommended)

1. **Open Command Prompt**:
   - Press `Win + R`
   - Type `cmd`
   - Press Enter

2. **Navigate to project**:
   ```cmd
   cd c:\Users\Ross\.gemini\antigravity\playground\ionized-station
   ```

3. **Ensure dependencies are installed**:
   ```cmd
   npm install
   ```

4. **Build the project**:
   ```cmd
   npm run build
   ```

5. **Verify dist folder**:
   ```cmd
   dir dist
   ```

### Method 2: VS Code Terminal

1. Open VS Code
2. Open Terminal (Ctrl + `)
3. Select "Command Prompt" from dropdown (not PowerShell)
4. Run:
   ```cmd
   npm run build
   ```

### Method 3: Git Bash

1. Right-click in project folder
2. Select "Git Bash Here"
3. Run:
   ```bash
   npm run build
   ```

## What Should Happen

When build succeeds, you'll see:

```
vite v7.2.4 building for production...
✓ 1234 modules transformed.
dist/index.html                   0.45 kB │ gzip:  0.30 kB
dist/assets/index-abc123.css     12.34 kB │ gzip:  3.45 kB
dist/assets/index-def456.js     234.56 kB │ gzip: 78.90 kB
✓ built in 5.67s
```

And a `dist/` folder will be created with:
- `index.html`
- `assets/` folder
- `.htaccess` (if in public folder)

## Verify Build Success

Check if dist folder exists:

**Windows Explorer:**
1. Navigate to: `c:\Users\Ross\.gemini\antigravity\playground\ionized-station`
2. Look for `dist` folder
3. Open it - should contain `index.html` and `assets` folder

**Command Line:**
```cmd
cd c:\Users\Ross\.gemini\antigravity\playground\ionized-station
dir dist
```

## Alternative: Manual Build Script

If npm commands aren't working, create a build script:

**build.bat** (save in project root):
```batch
@echo off
echo Building RICS Report Writer...
call npm install
call npm run build
echo Build complete! Check dist folder.
pause
```

Double-click `build.bat` to run.

## Still Having Issues?

### Check Node.js Version

```cmd
node --version
```

Should be v16 or higher. If not, download from: https://nodejs.org/

### Check npm Version

```cmd
npm --version
```

Should be v7 or higher.

### Clean Everything and Start Fresh

```cmd
# Delete node_modules and lock file
rmdir /s /q node_modules
del package-lock.json

# Reinstall
npm install

# Build
npm run build
```

## What to Do After Successful Build

1. **Verify files**:
   - Open `dist/index.html` in browser
   - Should see your application

2. **For GitHub**:
   - You can publish source code (don't need dist folder)
   - Users will build it themselves

3. **For Web Hosting**:
   - Upload everything from `dist/` folder
   - Include `.htaccess` file

## Quick Test Build

Test if Vite is working:

```cmd
npm run preview
```

This previews the last build. If this works, the build succeeded.

---

**Need more help?** Share the exact error message you're seeing.
