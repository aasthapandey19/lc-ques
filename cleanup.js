const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, 'leetcode-company-wise-problems');
const TARGET_FOLDER_NAME = '5. All.csv';

function cleanupFolder(folderPath) {
  const entries = fs.readdirSync(folderPath);

  for (const entry of entries) {
    const fullPath = path.join(folderPath, entry);
    const isTarget = entry === TARGET_FOLDER_NAME;

    if (!isTarget) {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`🗑️ Deleted: ${fullPath}`);
    }
  }
}

function startCleanup() {
  const companyFolders = fs.readdirSync(ROOT_DIR);

  for (const company of companyFolders) {
    const fullPath = path.join(ROOT_DIR, company);

    if (fs.lstatSync(fullPath).isDirectory()) {
      cleanupFolder(fullPath);
    }
  }

  console.log('✅ Cleanup complete. Only "5. All.csv" folders are kept.');
}

startCleanup();
