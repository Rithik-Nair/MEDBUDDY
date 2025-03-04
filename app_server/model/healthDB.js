const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Rithik:RTKA53@myatlasclusteredu.7ci8cvq.mongodb.net/MedBuddy?retryWrites=true&w=majority&appName=myAtlasClusterEDU', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

console.log("MongoDB Connected 🚀");

module.exports = mongoose;