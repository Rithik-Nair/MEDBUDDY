const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Function to search the dataset based on a query
function searchHealthData(query, callback) {
    const results = [];
    const filePath = path.join(__dirname, '..', '..', 'datasets', 'disease_dataset.csv');
    
    // Read the CSV file and search for the query in the 'disease' or relevant column
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            // Here we assume 'disease' is a column in the CSV, you can adjust it based on your dataset structure
            if (row.disease.toLowerCase().includes(query.toLowerCase())) {
                results.push(row);
            }
        })
        .on('end', () => {
            callback(null, results); // Send the filtered results
        })
        .on('error', (err) => {
            callback(err, null); // Handle any errors
        });
}

// Controller for the search route
exports.search = (req, res) => {
    const query = req.query.query || '';
    
    if (!query) {
        return res.render('searchResults', { results: [], query: '' });
    }
    
    searchHealthData(query, (err, results) => {
        if (err) {
            return res.status(500).send('Error processing search');
        }
        res.render('searchResults', { results, query });
    });
};
