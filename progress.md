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

## Status
PENDING - Testing new configuration.
