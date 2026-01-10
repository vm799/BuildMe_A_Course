# Vercel Deployment Guide for AI SecOps Course

## Quick Deployment Steps

1. **Prepare Your Files**
   - Ensure all content files are in the correct public directories:
     - `public/videos/` - MP4 files
     - `public/decks/` - PDF files  
     - `public/images/` - PNG files
     - `public/assets/` - Other assets

2. **Vercel Configuration**
   - The `vercel.json` file is already configured
   - It handles routing and static asset optimization

3. **Deployment Process**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Deploy to Vercel
   vercel --prod
   ```

## Troubleshooting White Screen Issues

If you encounter white screen issues:

1. **Check Browser Console** for specific errors
2. **Verify Asset Paths** in course.json match actual file locations
3. **Test Locally** first with `npm run dev`
4. **Clear Browser Cache** and hard refresh (Ctrl+F5)

## Known Issues and Solutions

### CSS Processing Issues
- **Problem**: Vite sometimes fails to process CSS through PostCSS
- **Solution**: The application includes fallback styling and will work even without processed CSS

### Import Map Conflicts  
- **Problem**: CDN import maps can interfere with module resolution
- **Solution**: The current setup uses local dependencies which is more reliable for deployment

## Production Ready Features

✅ Self-healing data loader (handles missing files gracefully)
✅ Admin Hub functionality for content management
✅ Mobile-optimized video players
✅ PDF viewer with fallback support
✅ PNG optimization with quality settings
✅ Professional error handling and placeholders

## Testing Checklist

Before deployment:
- [ ] All Week 1 content displays correctly
- [ ] Video, PDF, and image assets load properly  
- [ ] Admin Hub upload functionality works
- [ ] Mobile responsiveness tested
- [ ] No console errors in browser developer tools

## Emergency Fixes

If deployment fails:
1. Use the simplified package.json (`package-simple.json`)
2. Remove problematic CSS imports temporarily
3. Deploy with minimal configuration first
4. Add features incrementally

The core application functionality will work even with minimal styling.