const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const TARGET_NAME = 'data.csv';

const folders = fs.readdirSync(ROOT);

for (const folder of folders) {
  const folderPath = path.join(ROOT, folder);

  if (fs.lstatSync(folderPath).isDirectory()) {
    const csvPath = path.join(folderPath, TARGET_NAME);
    const newName = `${folder}-data.csv`;
    const newPath = path.join(ROOT, newName);

    if (fs.existsSync(csvPath)) {
      fs.renameSync(csvPath, newPath);
      console.log(`✅ Moved & Renamed: ${csvPath} → ${newName}`);
      fs.rmdirSync(folderPath); // remove the now-empty folder
    }
  }
}

console.log('🎉 All data.csv files moved and renamed to root.');
