const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const outputFile = 'merged.csv';

// Match only files like abc-data.csv, xyz-data.csv etc.
const csvFiles = fs.readdirSync('.').filter(file => file.endsWith('-data.csv'));

let mergedData = [];
let headersSet = false;
let headers = [];

function processFile(file) {
  return new Promise((resolve, reject) => {
    const rows = [];

    const folderName = file.replace('-data.csv', ''); // <-- ✅ Just the folder name

    fs.createReadStream(file)
      .pipe(csv())
      .on('headers', (fileHeaders) => {
        if (!headersSet) {
          headers = [...fileHeaders, 'source'];
          headersSet = true;
        }
      })
      .on('data', (data) => {
        data.source = folderName; // <-- ✅ Add clean folder name
        rows.push(data);
      })
      .on('end', () => {
        mergedData = mergedData.concat(rows);
        resolve();
      })
      .on('error', reject);
  });
}

(async () => {
  for (const file of csvFiles) {
    await processFile(file);
  }

  const csvWriter = createCsvWriter({
    path: outputFile,
    header: headers.map(h => ({ id: h, title: h }))
  });

  await csvWriter.writeRecords(mergedData);
  console.log(`✅ Merged ${csvFiles.length} files into ${outputFile}`);
})();
