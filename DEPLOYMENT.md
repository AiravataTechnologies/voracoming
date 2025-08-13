# Deployment Guide

This full-stack TypeScript application is ready for deployment on Replit and other platforms.

## Quick Deploy on Replit

1. **Fork/Import this project** to your Replit account
2. **Set up environment variables** in the Secrets tab:
   - `GMAIL_USER`: Your Gmail address for sending notifications
   - `GMAIL_APP_PASSWORD`: Your Gmail app-specific password
   - `NODE_ENV`: Set to `production` for live deployment

3. **Deploy**: Click the Deploy button in Replit to make your app live

## Environment Variables Setup

### Required for Email Functionality:
```bash
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
```

### Optional:
```bash
NODE_ENV=production
PORT=5000
DATABASE_URL=your-database-url (if using PostgreSQL)
```

## Gmail App Password Setup

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Go to Security > App passwords
4. Generate a new app password for "Mail"
5. Use this 16-character password in `GMAIL_APP_PASSWORD`

## Security Features

✅ **Environment Variables**: Sensitive data stored securely  
✅ **Rate Limiting**: API endpoints protected from abuse  
✅ **Security Headers**: XSS, CSRF, and content-type protection  
✅ **Input Validation**: Email format validation and sanitization  
✅ **Error Handling**: Graceful degradation when services unavailable  

## Production Checklist

- [ ] Environment variables configured
- [ ] Gmail app password generated and tested
- [ ] Build process completed successfully
- [ ] Security headers enabled
- [ ] Rate limiting configured
- [ ] Error logging configured

## Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Type checking
npm run check
```

## Deployment Options

1. **Replit Deployments** (Recommended)
   - Automatic HTTPS
   - Custom domains available
   - Zero-config deployment
   - Built-in secrets management

2. **Other Platforms**
   - Ensure Node.js 20+ support
   - Set environment variables
   - Run `npm run build` before deployment
   - Serve from `dist/` directory

## Architecture

- **Frontend**: React + TypeScript with Vite
- **Backend**: Express.js with TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **Email**: Nodemailer with Gmail
- **Build**: Vite for frontend, esbuild for backend

## Security Considerations

- Credentials stored in environment variables only
- Rate limiting prevents API abuse
- Security headers protect against common attacks
- Input validation on all user inputs
- Error messages don't expose sensitive information

## Support

If you encounter issues:
1. Check environment variables are set correctly
2. Verify Gmail app password is valid
3. Check build logs for errors
4. Ensure all dependencies are installed