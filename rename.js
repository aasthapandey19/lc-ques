const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OLD_NAME = '5. All.csv';
const NEW_NAME = 'data.csv';

const folders = fs.readdirSync(ROOT);

for (const folder of folders) {
  const folderPath = path.join(ROOT, folder);

  if (fs.lstatSync(folderPath).isDirectory()) {
    const oldFilePath = path.join(folderPath, OLD_NAME);
    const newFilePath = path.join(folderPath, NEW_NAME);

    if (fs.existsSync(oldFilePath) && fs.lstatSync(oldFilePath).isFile()) {
      fs.renameSync(oldFilePath, newFilePath);
      console.log(`✅ Renamed: ${folder}/${OLD_NAME} → ${NEW_NAME}`);
    }
  }
}

console.log('🎉 Done renaming all "5. All.csv" files to "data.csv"');
