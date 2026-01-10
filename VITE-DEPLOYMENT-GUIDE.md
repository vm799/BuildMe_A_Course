# 🚀 VITE + REACT SPA DEPLOYMENT GUIDE

## 🔧 SOLID FIXES FOR VERCAL WHITE SCREEN ISSUES

### 🏗️ 1. Essential Vercel Configuration

**Create/Update `vercel.json`:**
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

This tells Vercel to route ALL requests through your SPA's index.html, preventing 404 errors on refresh/navigation.

### 📁 2. File Structure Requirements

Ensure your project structure looks like this:
```
project-root/
├── public/
│   ├── data/
│   │   └── course.json
│   ├── videos/
│   │   └── week1-video.mp4
│   ├── decks/
│   │   └── week1-deck.pdf
│   └── images/
│       └── week1-schema.png
├── src/
│   └── hooks/
│       └── useCourseData.ts
├── components/
│   ├── ViteAdminHub.tsx
│   └── AssetTester.tsx
└── vercel.json
```

### 🛠️ 3. Dynamic Data Loading (NO fs MODULES!)

**Replace static imports with fetch:**
```typescript
// ❌ WRONG - Uses Node.js fs module
import courseData from '../data/course.json';

// ✅ CORRECT - Browser-compatible fetch
export const useCourseData = () => {
  useEffect(() => {
    fetch('/data/course.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);
};
```

### 🧪 4. Asset Testing Route

**Test all media assets work individually:**
```
https://your-app.vercel.app/videos/test.mp4  → Should play video
https://your-app.vercel.app/decks/test.pdf    → Should show PDF
https://your-app.vercel.app/images/test.png  → Should show image
```

### 🎯 5. Vite-Optimized Admin Hub

**Features:**
- Uses localStorage for temporary storage
- Export button generates downloadable course.json
- No server-side file writing required
- Fully compatible with Vercel's static hosting

## 🔍 DEBUGGING CHECKLIST

### Before Deployment:
- [ ] `vercel.json` exists with rewrite rules
- [ ] All assets in correct `public/` subdirectories
- [ ] No `fs`, `path`, or Node.js modules in client code
- [ ] Using fetch() instead of import for JSON data
- [ ] BrowserRouter with basename="/" configured

### After Deployment:
- [ ] Direct asset URLs work (test.mp4, test.pdf, test.png)
- [ ] Refreshing any route doesn't show 404
- [ ] Console shows "Successfully loaded course.json"
- [ ] Admin Hub saves changes to localStorage
- [ ] Export function generates valid JSON

## 🚨 COMMON ISSUES & SOLUTIONS

**Issue**: White screen on route refresh
**Solution**: Missing vercel.json rewrite configuration

**Issue**: "Module not found" errors
**Solution**: Remove all Node.js imports (fs, path) from client code

**Issue**: Assets not loading
**Solution**: Verify files are in public/ folder, not src/assets/

**Issue**: Admin changes lost on refresh
**Solution**: Using localStorage - export JSON and commit to repo for persistence

## 🏁 FINAL DEPLOYMENT WORKFLOW

1. **Local Testing**:
   ```bash
   npm run build
   npm run preview
   # Test all routes and asset loading
   ```

2. **Vercel Deployment**:
   ```bash
   vercel --prod
   ```

3. **Post-Deployment Verification**:
   - Visit `/test-assets` route
   - Test video, PDF, and image loading
   - Verify admin hub functionality
   - Check browser console for errors

4. **Production Updates**:
   - Use Admin Hub to make changes
   - Click "Export Course Data"
   - Commit updated course.json to repository
   - Changes deploy automatically

This Vite-optimized approach ensures your AI SecOps course deploys reliably without white screens or routing issues!