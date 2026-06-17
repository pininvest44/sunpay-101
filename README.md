# SunPay Bulk STK Push

## Features
- Bulk phone number textarea
- Amount field
- Reference field
- 2 second delay between requests
- Success/failure logging
- Render deployment ready

## Local Run
npm install
cp .env.example .env
npm start

## GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main

## Render
1. Push to GitHub
2. Create Web Service on Render
3. Add environment variables:
   - SUNPAY_API_KEY
   - SUNPAY_BASE_URL
4. Deploy
