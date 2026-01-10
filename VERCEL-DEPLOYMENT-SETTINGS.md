# Vercel Domain Deployment Settings

## 🔧 Critical Vercel Configuration

### 1. Environment Variables (Settings → Environment Variables)
```
NODE_ENV=production
BASE_PATH=/
```

### 2. Build & Development Settings (Project Settings)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

### 3. Domain Configuration Options

#### Option A: Vercel Subdomain (Recommended for Quick Testing)
- Your app will be available at: `your-project-name.vercel.app`
- No additional configuration needed
- Perfect for immediate deployment and testing

#### Option B: Custom Domain
1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain (e.g., `course.yourcompany.com`)
3. Configure DNS records as prompted by Vercel
4. Wait for SSL certificate provisioning (usually instant)

#### Option C: Root Domain
1. Add apex domain (e.g., `yourcompany.com`)
2. Vercel will provide DNS configuration
3. Point your domain's DNS to Vercel's nameservers

## 🚨 Common Build Failures & Solutions

### Issue 1: "Module not found" or CSS Processing Errors
**Solution**: Use minimal build configuration
```bash
# Temporarily rename package.json to use simpler config
mv package.json package-full.json
mv package-simple.json package.json
```

### Issue 2: Asset Path Issues
**Solution**: Verify all assets are in correct directories:
```
/public/videos/week1-video.mp4
/public/decks/week1-deck.pdf  
/public/images/week1-schema.png
```

### Issue 3: Memory Limit Exceeded
**Solution**: Add to vercel.json:
```json
{
  "build": {
    "env": {
      "NODE_OPTIONS": "--max-old-space-size=4096"
    }
  }
}
```

## 🛠️ Emergency Deployment Steps

If standard deployment fails:

1. **Minimal Deploy**:
   ```bash
   # Create minimal package.json
   {
     "name": "buildmeacourse",
     "private": true,
     "scripts": {
       "build": "vite build"
     },
     "devDependencies": {
       "vite": "^6.2.0"
     }
   }
   ```

2. **Static Deploy**:
   - Build locally: `npm run build`
   - Deploy `dist` folder as static site
   - Skip Vercel's build process entirely

3. **GitHub Pages Alternative**:
   - Push `dist` folder to `gh-pages` branch
   - Enable GitHub Pages in repository settings

## ⚙️ Advanced Settings

### Performance Optimization
Add to vercel.json:
```json
{
  "regions": ["iad1"],
  "cleanUrls": true,
  "trailingSlash": false
}
```

### Security Headers
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options", 
          "value": "DENY"
        }
      ]
    }
  ]
}
```

## 📋 Pre-Deployment Checklist

- [ ] All content files in correct public directories
- [ ] Environment variables set in Vercel
- [ ] Custom domain DNS configured (if applicable)
- [ ] SSL certificate provisioned
- [ ] Test deployment on staging first
- [ ] Verify all multimedia assets load correctly

## 🆘 Support Resources

- Vercel Documentation: https://vercel.com/docs
- Build Failures Guide: https://vercel.com/docs/build-errors
- Custom Domains: https://vercel.com/docs/concepts/projects/domains/add-a-domain

The improved `vercel-improved.json` file in your project directory contains optimized routing and caching settings for your AI SecOps course deployment.