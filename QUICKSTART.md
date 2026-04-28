# 🚀 QUICK START GUIDE

## Installation Steps

### 1. Navigate to Project Directory
```bash
cd sway-fitting-room
```

### 2. Install Dependencies
```bash
npm install
```

This will install:
- next (^14.0.0)
- react (^18.2.0)
- react-dom (^18.2.0)
- three (^0.160.0)
- @react-three/fiber (^8.15.0)
- @react-three/drei (^9.92.0)

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open in Browser
```
http://localhost:3000
```

## Expected Behavior

✅ You should see the SWAY 3D Virtual Fitting Room homepage
✅ A 3D rotatable shirt preview (gray box with texture placeholder)
✅ Product selector buttons (Maverick Phoenix / Bluish Splash)
✅ Size input form (Height & Weight)
✅ Size guide tables at the bottom

## Test the Application

### Test 1: Maverick Phoenix (Oversized)
1. Click "Maverick Phoenix" button
2. Enter Height: 162
3. Enter Weight: 55
4. Click "Try & Fit"
5. **Expected Result:** Size S recommendation (54cm × 72.5cm)

### Test 2: Bluish Splash (Regular)
1. Click "Bluish Splash" button
2. Enter Height: 175
3. Enter Weight: 70
4. Click "Try & Fit"
5. **Expected Result:** Size M or L recommendation

### Test 3: Input Validation
1. Leave fields empty → Error message
2. Enter negative numbers → Error message
3. Enter text instead of numbers → Error message

## Next Steps

### Replace Placeholder Texture
1. Add your product image to `/public/textures/`
2. Name it appropriately (e.g., `maverick-phoenix.png`)
3. Update `lib/products.js`:
```javascript
texture: "/textures/maverick-phoenix.png"
```

### Add More Products
Edit `/lib/products.js` and add new product objects following the same structure.

### Customize Styling
All styling is inline in the components for easy modification. Look for `style={{}}` props.

## Production Build

```bash
npm run build
npm start
```

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Then run dev server again
npm run dev
```

### Module Not Found
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### 3D Viewer Not Showing
- Check browser console for errors
- Ensure WebGL is supported (most modern browsers do)
- Try a different browser (Chrome recommended)

## Support

Refer to the main README.md for detailed documentation.

---

**Your SWAY 3D Fitting Room is ready! 🎉**
