const { PythonShell } = require('python-shell');

exports.detectSentiment = (message) => {
    return new Promise((resolve, reject) => {
        let options = {
            args: [message]
        };

        PythonShell.run('./chatbot_backend/app.py', options, (err, result) => {
            if (err) reject(err);
            resolve(result.toString());
        });
    });
};
