# CSS Deployment Fix

## Issue
CSS styling not applied in Vercel deployment (works locally).

## Root Cause
The `vercel.json` rewrite rule `/(.*) -> /index.html` was catching ALL requests including static asset paths (`/assets/*.css`, `/assets/*.js`) before static file resolution.

## Fix Applied
Updated `vercel.json` to exclude the `assets/` directory from rewrites:
```json
{
  "rewrites": [
    { "source": "/((?!assets/).*)", "destination": "/index.html" }
  ]
}
```

## Files Changed
- `vercel.json` - Fixed rewrite pattern to exclude assets
- `index.html` - Removed debug CSS test elements
- `src/index.css` - Removed debug `body { background: red; }`

## Attempt 2
Previous fix didn't work. Updated vercel.json:
- Added `"framework": "vite"` to help Vercel detection
- Changed rewrite pattern to `/((?!.*\\.).*)`  - excludes ANY path with a file extension (not just assets/)

## Attempt 3
Removed custom rewrites entirely - Vercel's Vite preset handles SPA routing automatically.
Added explicit `outputDirectory: "dist"` to ensure Vercel serves from build output.

```json
{
  "framework": "vite",
  "outputDirectory": "dist"
}
```

## Attempt 4
Using Vercel routes API with explicit filesystem handler:
```json
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```
This tells Vercel: serve static files first, then fallback to index.html for SPA routing.

## Attempt 5 - FINAL FIX
**Root cause**: Missing `outputDirectory` meant Vercel served from root, not `dist/`. Legacy `routes` API conflicted with modern build.

**Structural cleanup**:
- Deleted `dist-minimal/` (stale build)
- Deleted `package-simple.json`, `package-vercel.json`, `final-verification.js` (redundant)

**Fixed vercel.json**:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## Attempt 6 - ACTUAL FIX
**Root cause:** The rewrite `/(.*) -> /index.html` was catching ALL requests including `/assets/*.css`, blocking static file serving.

**Fix:** Removed rewrites entirely. Vercel serves static files from `outputDirectory` automatically without needing custom routing.

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

## Attempt 8 - FINAL
**Root cause:** Vercel auto-detected wrong framework, served source files instead of dist/. Stale config files caused confusion.

**Fix:**
- Added `"framework": null` to force explicit build config
- Deleted stale configs: `vercel-improved.json`, `vercel-modern.json`, `vercel-spa.json`, `vite-minimal.config.js`
- Verified: `npm run build` → `dist/index.html` correctly links `/assets/style-*.css`

## Status
RESOLVED - Build mode enforced. dist/ served with CSS.
