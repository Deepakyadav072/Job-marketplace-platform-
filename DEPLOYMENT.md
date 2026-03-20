# Deployment Guide

This guide will help you deploy the Microjobs application with:
- **Frontend**: GitHub Pages (automatic)
- **Backend**: Render (manual setup required)

---

## ✅ Frontend Deployment (GitHub Pages)

Your frontend is now configured to auto-deploy to GitHub Pages!

### Auto-Deploy Setup
1. Go to your GitHub repository: `https://github.com/Deepakyadav072/Job-marketplace-platform-`
2. Navigate to **Settings** → **Pages**
3. Under "Build and deployment":
   - Set **Source** to "GitHub Actions"
4. Every time you push to `main`, GitHub Actions will automatically build and deploy

### Access Your Frontend
Your frontend will be live at:
```
https://Deepakyadav072.github.io/Job-marketplace-platform-/
```

### To Manually Trigger Deploy
```bash
# Push changes to main branch
git add .
git commit -m "Your message"
git push origin main
```

---

## ⚙️ Backend Deployment (Render)

Follow these steps to deploy your backend:

### Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub

### Step 2: Create New Web Service
1. Click **New +** → **Web Service**
2. Connect your GitHub repository
3. Select `Job-marketplace-platform-` repository

### Step 3: Configure Service
- **Name**: `microjobs-backend`
- **Root Directory**: `microjobs-backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Step 4: Add Environment Variables
In Render dashboard, go to **Environment** and add:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret_key
CORS_ORIGIN=https://Deepakyadav072.github.io/Job-marketplace-platform-/
```

### Step 5: Deploy
1. Click **Create Web Service**
2. Wait for build to complete (2-3 minutes)
3. Your backend URL will be: `https://microjobs-backend.onrender.com`

### Step 6: Update Frontend API URL
Update `microjobs-frontend/src/utils/axiosInstance.js`:
```javascript
const API_BASE_URL = 'https://microjobs-backend.onrender.com/api';
```

Then push to GitHub:
```bash
git add .
git commit -m "Update API endpoint for production"
git push origin main
```

---

## 📦 Database Setup (MongoDB Atlas)

### Create MongoDB Atlas Account
1. Go to [mongodb.com/cloud](https://mongodb.com/cloud)
2. Sign up and create cluster
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/microjobs`

---

## 🔗 Update CORS Settings

In your backend `server.js`, update CORS allowed origins:
```javascript
app.use(cors({
  origin: ["https://Deepakyadav072.github.io", "http://localhost:5173"],
  credentials: true,
}));
```

---

## ✅ Deployment Checklist

- [ ] Frontend deployed to GitHub Pages
- [ ] Backend deployed to Render
- [ ] MongoDB Atlas database configured
- [ ] Environment variables set in Render
- [ ] API URL updated in frontend
- [ ] CORS configured for production
- [ ] Test login functionality
- [ ] Test job posting
- [ ] Test job applications

---

## 🔄 Automatic Deployment Workflow

Every time you push to `main`:
1. GitHub Actions builds the frontend
2. Frontend automatically deployed to GitHub Pages
3. (Optional) You can setup Render webhooks for auto-deploy

### To Setup Render Auto-Deploy:
1. In Render dashboard, go to **Settings**
2. Copy the **Deploy Hook URL**
3. Go to GitHub repo → **Settings** → **Secrets**
4. Add secret: `RENDER_DEPLOY_HOOK_URL` with the webhook URL

---

## 🚀 Live Application URLs

Once deployed:
- **Frontend**: `https://Deepakyadav072.github.io/Job-marketplace-platform-/`
- **Backend API**: `https://microjobs-backend.onrender.com/api`

---

## 📝 Troubleshooting

### Frontend not loading
- Clear browser cache
- Check GitHub Actions for build errors
- Verify base path in `vite.config.js`

### Backend API errors
- Check Render logs for errors
- Verify environment variables in Render
- Check MongoDB connection string
- Ensure CORS is properly configured

### API calls failing
- Check browser console for CORS errors
- Verify API URL in `axiosInstance.js`
- Check Render server logs

---

## 📞 Support

For deployment issues:
1. Check GitHub Actions workflow logs
2. Check Render service logs
3. Review MongoDB Atlas connection status
4. Verify environment variables are correct
