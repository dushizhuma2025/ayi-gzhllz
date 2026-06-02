const fs = require('fs');
const path = require('path');

const srcPublic = path.resolve(__dirname, '..', 'public');
const destDist = path.resolve(__dirname, '..', 'dist');

if (fs.existsSync(srcPublic) && fs.existsSync(destDist)) {
  const files = ['favicon.ico', 'ayilogo.png'];
  files.forEach(file => {
    const srcFile = path.join(srcPublic, file);
    const destFile = path.join(destDist, file);
    if (fs.existsSync(srcFile)) {
      fs.copyFileSync(srcFile, destFile);
      console.log(`✓ Copied ${file} to dist/`);
    }
  });
}
