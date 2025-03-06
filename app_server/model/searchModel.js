const fs = require('fs');
const csv = require('csv-parser');

function searchDisease(query, callback) {
  const results = [];
  const filePath = './datasets/disease_dataset.csv';

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      if (row.Disease.toLowerCase().includes(query.toLowerCase()) ||
          row.Symptoms.toLowerCase().includes(query.toLowerCase())) {
        results.push(row);
      }
    })
    .on('end', () => {
      callback(results);
    });
}

module.exports = { searchDisease };
