# Netlify Deployment Guide

This project has been configured for seamless deployment on Netlify. Follow these steps to deploy your coming soon page.

## Quick Deployment Steps

### Option 1: Deploy from Git Repository (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for Netlify deployment"
   git push origin main
   ```

2. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com) and sign up/login
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your repository
   - Netlify will automatically detect the build settings from `netlify.toml`

3. **Configure Environment Variables** (Optional for email functionality):
   - Go to Site settings → Environment variables
   - Add the following variables:
     - `EMAIL_USER`: Your Gmail address (e.g., `your-email@gmail.com`)
     - `EMAIL_PASS`: Your Gmail app password (see setup below)

### Option 2: Manual Deployment

1. **Build the project**:
   ```bash
   npx vite build --config vite.config.netlify.ts
   cp _redirects dist/_redirects
   cp -r netlify dist/
   ```

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder to the deploy area

## Email Setup (Optional)

To enable email notifications when users subscribe:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. **Add Environment Variables** in Netlify:
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASS`: The generated app password (16-character code)

## Project Structure for Netlify

```
├── netlify.toml              # Netlify configuration
├── _redirects               # URL redirects for SPA
├── netlify/functions/       # Serverless functions
│   └── subscribe.js         # Email subscription handler
├── dist/                    # Built files (generated)
├── client/                  # React frontend source
└── vite.config.netlify.ts  # Vite config for Netlify
```

## Features

✅ **Static Site Hosting**: React frontend served from CDN  
✅ **Serverless Functions**: Email subscription backend  
✅ **Automatic Builds**: Deploys on every Git push  
✅ **Custom Domain**: Add your own domain  
✅ **HTTPS**: Free SSL certificate  
✅ **Form Handling**: Contact form submissions  

## Development vs. Production

- **Development**: Run `npm run dev` for local development with Express server
- **Production**: Netlify serves the static build with serverless functions

## Custom Domain Setup

1. In Netlify dashboard, go to Domain settings
2. Add your custom domain
3. Update your DNS records as instructed
4. Netlify provides free SSL certificate

## Troubleshooting

### Build Issues
- Ensure all dependencies are listed in `package.json`
- Check build logs in Netlify dashboard
- Verify `netlify.toml` configuration

### Function Issues
- Check function logs in Netlify dashboard
- Verify environment variables are set
- Test functions locally with Netlify CLI: `netlify dev`

### Email Issues
- Verify Gmail app password is correct
- Check that 2FA is enabled on Gmail account
- Review function logs for error messages

## Support

If you encounter issues:
1. Check Netlify build logs
2. Review function logs for errors
3. Verify environment variables
4. Test locally with `netlify dev`

Your coming soon page is now ready for the world! 🚀