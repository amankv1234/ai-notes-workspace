# Deployment Guide: AI Notes Workspace

This guide outlines the steps to deploy the AI Notes Workspace to **Render** (Backend) and **Vercel** (Frontend).

## 1. Backend Deployment (Render)

1. **Connect Repository**: Link your GitHub repo to Render.
2. **Environment**: Select **Web Service**.
3. **Configuration**:
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. **Environment Variables**:
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A secure random string.
   - `GEMINI_API_KEY`: Your Google AI API key.
   - `FRONTEND_URL`: Your Vercel app URL (e.g., `https://workspace.vercel.app`).
   - `NODE_ENV`: `production`

## 2. Frontend Deployment (Vercel)

1. **Connect Repository**: Import the `frontend` folder from your repo.
2. **Framework Preset**: `Vite`
3. **Build Settings**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Environment Variables**:
   - `VITE_API_URL`: Your Render backend URL (e.g., `https://api-workspace.onrender.com`).

## 3. Post-Deployment Checklist

- [ ] Ensure **CORS** is working by checking if `FRONTEND_URL` in backend matches the Vercel URL.
- [ ] Verify **Gemini API** works by generating a summary in production.
- [ ] Test **Persistent Auth** by reloading the dashboard after login.

## Troubleshooting

- **CORS Errors**: Double-check the `FRONTEND_URL` in Render. It should NOT have a trailing slash.
- **MongoDB Connection**: Ensure your IP whitelist in MongoDB Atlas allows access from `0.0.0.0/0` (Render's IPs are dynamic).
- **Blank Frontend**: Ensure `VITE_API_URL` is set correctly during the Vercel build process.
