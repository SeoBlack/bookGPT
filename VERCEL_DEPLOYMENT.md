# BookGPT Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

### Option 1: Deploy with Vercel CLI (Recommended)

1. **Install Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**

   ```bash
   vercel login
   ```

3. **Deploy from your project directory**

   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy: `Y`
   - Which scope: Select your account
   - Link to existing project: `N`
   - Project name: `bookgpt` (or your preferred name)
   - Directory: `./` (current directory)
   - Override settings: `N`

### Option 2: Deploy via GitHub Integration

1. **Push your code to GitHub**

   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push
   ```

2. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

3. **Click "New Project"**

4. **Import your GitHub repository**

5. **Configure the project:**
   - Framework Preset: `Node.js`
   - Root Directory: `./`
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist`
   - Install Command: `npm install`

## 🔧 Environment Variables Setup

### Required Environment Variables

In your Vercel project dashboard, go to **Settings > Environment Variables** and add:

| Variable           | Value                    | Environment                      |
| ------------------ | ------------------------ | -------------------------------- |
| `OPENAI_API_KEY`   | `sk-your-openai-api-key` | Production, Preview, Development |
| `PINECONE_API_KEY` | `your-pinecone-api-key`  | Production, Preview, Development |
| `NODE_ENV`         | `production`             | Production, Preview, Development |

### Optional Environment Variables

| Variable       | Value                            | Environment                      |
| -------------- | -------------------------------- | -------------------------------- |
| `FRONTEND_URL` | `https://your-domain.vercel.app` | Production                       |
| `PORT`         | `3001`                           | Production, Preview, Development |

## 📁 Project Structure for Vercel

```
bookGPT/
├── server.js              # Main server file
├── vercel.json            # Vercel configuration
├── build-vercel.js        # Vercel build script
├── package.json           # Dependencies and scripts
├── src/                   # React frontend source
├── dist/                  # Built frontend (generated)
├── uploads/               # PDF uploads (created at runtime)
└── temp_images/           # Temporary images (created at runtime)
```

## 🔍 Important Notes for Vercel

### File Upload Limitations

- **Vercel has a 4.5MB payload limit** for serverless functions
- **For larger PDFs**, consider using:
  - Vercel's Edge Functions
  - External file storage (AWS S3, Cloudinary)
  - Direct upload to Pinecone

### Serverless Function Limits

- **Execution time**: 10 seconds (Hobby), 60 seconds (Pro)
- **Memory**: 1024MB
- **Payload size**: 4.5MB

### Recommended Modifications for Production

1. **Use external file storage** for PDFs:

   ```javascript
   // Instead of local storage, use:
   // - AWS S3
   // - Cloudinary
   // - Vercel Blob Storage
   ```

2. **Implement file size validation**:

   ```javascript
   const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB for Vercel
   ```

3. **Add timeout handling**:
   ```javascript
   // In your API routes
   const timeout = setTimeout(() => {
     res.status(408).json({ error: "Request timeout" });
   }, 8000); // 8 seconds
   ```

## 🚀 Deployment Steps

### Step 1: Prepare Your Repository

```bash
# Ensure all files are committed
git add .
git commit -m "Ready for Vercel deployment"
git push
```

### Step 2: Deploy to Vercel

```bash
# Deploy
vercel

# For production deployment
vercel --prod
```

### Step 3: Configure Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add your API keys
4. Redeploy if needed

### Step 4: Test Your Deployment

1. Visit your Vercel URL
2. Test PDF upload (with small files)
3. Test chat functionality
4. Check health endpoint: `https://your-domain.vercel.app/api/health`

## 🔧 Troubleshooting

### Common Issues

1. **Build fails**

   - Check Node.js version (should be 18+)
   - Verify all dependencies are in `package.json`
   - Check build logs in Vercel dashboard

2. **API errors**

   - Verify environment variables are set
   - Check API key permissions
   - Monitor function execution time

3. **File upload fails**

   - Check file size (must be < 4.5MB)
   - Verify file format (PDF only)
   - Check serverless function timeout

4. **CORS errors**
   - Verify `FRONTEND_URL` is set correctly
   - Check CORS configuration in `server.js`

### Debugging

1. **Check Vercel logs**:

   ```bash
   vercel logs
   ```

2. **Test locally**:

   ```bash
   npm run build
   NODE_ENV=production node server.js
   ```

3. **Monitor function performance** in Vercel dashboard

## 📈 Scaling Considerations

### For High Traffic

- Upgrade to Vercel Pro for longer execution times
- Implement caching strategies
- Use CDN for static assets
- Consider database optimization

### For Large Files

- Implement chunked uploads
- Use external storage services
- Add progress indicators
- Implement retry mechanisms

## 🔒 Security Best Practices

1. **Never commit API keys** to your repository
2. **Use environment variables** for all secrets
3. **Implement rate limiting** (already configured)
4. **Validate file uploads** (already implemented)
5. **Use HTTPS** (automatic with Vercel)

## 📞 Support

- **Vercel Documentation**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **GitHub Issues**: For BookGPT-specific issues

---

**Happy Deploying! 🚀**
