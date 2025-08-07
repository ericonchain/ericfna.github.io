# 🚀 GitHub Pages Deployment Guide

Your conference website is now ready for **GitHub Pages** deployment with client-side PayPal integration!

## ✅ What Works with GitHub Pages

✓ **Complete website** with all sections and styling  
✓ **PayPal payments** using client-side Smart Payment Buttons  
✓ **No backend required** - everything runs in the browser  
✓ **Free hosting** on GitHub Pages  

## 📋 Quick Setup Steps

### 1. Get Your PayPal Client ID

1. Go to [PayPal Developer](https://developer.paypal.com)
2. Log in and create a new app
3. Copy your **Live Client ID** (not sandbox)
4. Update `scripts/paypal-integration.js` line 4:
   ```javascript
   const PAYPAL_CLIENT_ID = 'YOUR_ACTUAL_CLIENT_ID_HERE';
   ```

### 2. Deploy to GitHub

1. Download your project as ZIP from Replit
2. Create new GitHub repository
3. Upload these files:
   - `index.html`
   - `styles/` folder
   - `scripts/` folder  
   - `assets/` folder
   - `pages/` folder
4. Enable GitHub Pages in repository settings

### 3. Update Pricing (Optional)

Current USD pricing:
- **Argentinos**: $25 USD (equivalent to $25,000 ARS)
- **Extranjeros**: $80 USD  
- **Becas**: $12.50 USD (equivalent to $12,500 ARS)

To update amounts, edit `scripts/paypal-integration.js` lines 18, 24, 30.

## 🎯 What Happens When Someone Pays

1. User fills registration form
2. Clicks PayPal button  
3. PayPal handles payment securely
4. Payment confirmation shown on site
5. Registration data logged to browser console

## 📧 Getting Registration Data

Since GitHub Pages can't run server code, consider these options:

**Option A: Email Integration (Recommended)**
- Use [EmailJS](https://emailjs.com) for free email sending
- Sends registration data directly to your email

**Option B: Form Services**  
- [Formspree](https://formspree.io) - handles form submissions
- [Netlify Forms](https://netlify.com) - if you use Netlify instead

**Option C: Google Sheets**
- Use Google Apps Script to save data to spreadsheet

## 🔧 Files You Need for Deployment

**Essential Files:**
```
index.html                    (main website)
styles/main.css              (styling)
scripts/main.js               (navigation)
scripts/countdown.js          (countdown timer)
scripts/forms.js              (form handling)
scripts/paypal-integration.js (PayPal payments)
assets/                       (images and resources)
pages/                        (additional pages)
```

**Files to SKIP:**
```
server/                       (backend code - not needed)
client/                       (React app - not needed)
package.json                  (Node.js deps - not needed)
node_modules/                 (dependencies - not needed)
```

## 🌐 Live Website URL

After deployment, your site will be available at:
`https://yourusername.github.io/yourrepository`

## 💡 Pro Tips

- Test PayPal integration with small amounts first
- Keep your Client ID secure (it's safe to use client-side)
- Monitor PayPal dashboard for incoming payments
- Update currency conversion rates as needed

Your website is production-ready! 🎉