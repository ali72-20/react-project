# How to Add Your Actual Images to the Portfolio

## Step 1: Get Your Google Drive Image URLs

1. Open your Google Drive folder: https://drive.google.com/drive/folders/1OP2NNC47kx8VIzy1CIYE2VYgMPQ-Yokl?usp=sharing

2. For each image you want to use:
   - Right-click on the image
   - Select "Get link" or "Share"
   - Make sure the link sharing is set to "Anyone with the link can view"
   - Copy the link

3. Convert Google Drive links to direct image URLs:
   - Replace `https://drive.google.com/file/d/FILE_ID/view` 
   - With `https://drive.google.com/uc?export=view&id=FILE_ID`

## Step 2: Update the Portfolio

1. Open `/src/App.js` file
2. Find the `worksData` array (around line 17)
3. Replace the placeholder URLs with your actual image URLs

### Example:
```javascript
// Before (placeholder):
{ id: "1", section: "Abstract Art", title: "Abstract Composition", description: "Exploring form and color through abstract expression.", image: "https://drive.google.com/uc?export=view&id=YOUR_ABSTRACT_ART_IMAGE_ID" }

// After (with your actual image):
{ id: "1", section: "Abstract Art", title: "My Abstract Work", description: "Exploring form and color through abstract expression.", image: "https://drive.google.com/uc?export=view&id=1ABC123DEF456GHI789JKL" }
```

## Step 3: Your Art Categories

Based on your Google Drive folders, here are the categories I've set up:

1. **Abstract Art** - Your abstract compositions
2. **Digital Painting** - Your digital artwork
3. **Traditional Painting** - Your traditional oil/acrylic paintings
4. **Contemporary Mosaic** - Your mosaic artwork
5. **Illustrations** - Your illustrative works
6. **Logo Design** - Your logo and branding work
7. **AI Art** - Your AI-generated artwork
8. **Architectural** - Your architectural designs (معماري)

## Step 4: Add More Artworks

You can add more artworks by adding new objects to the `worksData` array:

```javascript
{ 
  id: "9", 
  section: "Abstract Art", 
  title: "Another Abstract Work", 
  description: "Description of your artwork.", 
  image: "https://drive.google.com/uc?export=view&id=YOUR_IMAGE_ID" 
}
```

## Step 5: Customize Titles and Descriptions

- Update the `title` field with your actual artwork titles
- Update the `description` field with descriptions of your work
- Make sure the `section` matches one of the category names

## Tips:
- Use high-quality images for better portfolio presentation
- Keep descriptions concise but descriptive
- Test the images load correctly after updating
- You can add multiple artworks per category

## Need Help?
If you need help with any step, just ask!
