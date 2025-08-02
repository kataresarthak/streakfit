# StreakFit Deployment Guide

## Deploying to Render

### Prerequisites
- A Render account (free tier available)
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

### Steps to Deploy

1. **Sign up/Login to Render**
   - Go to [render.com](https://render.com)
   - Sign up or login to your account

2. **Create a New Web Service**
   - Click "New +" button
   - Select "Web Service"
   - Connect your Git repository (GitHub, GitLab, or Bitbucket)

3. **Configure the Service**
   - **Name**: `streakfit` (or your preferred name)
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty (if your Next.js app is in the root)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

4. **Environment Variables**
   - Add the following environment variable:
     - Key: `NODE_ENV`
     - Value: `production`

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your app
   - The first deployment may take 5-10 minutes

### Alternative: Using render.yaml (Recommended)

If you have the `render.yaml` file in your repository:
1. Go to Render Dashboard
2. Click "New +" → "Blueprint"
3. Connect your repository
4. Render will automatically detect and use the `render.yaml` configuration

### Post-Deployment

- Your app will be available at: `https://your-app-name.onrender.com`
- Render provides automatic HTTPS
- Automatic deployments on every push to your main branch

### Troubleshooting

- **Build Failures**: Check the build logs in Render dashboard
- **Runtime Errors**: Check the service logs
- **Environment Variables**: Ensure all required env vars are set in Render dashboard

### Performance Tips

- Consider upgrading to a paid plan for better performance
- Enable caching headers in your Next.js app
- Optimize images and assets 