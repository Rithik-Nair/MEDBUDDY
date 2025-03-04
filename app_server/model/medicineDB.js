const MedicineSchema = new mongoose.Schema({
    disease: { type: String, required: true },
    medicines: { type: [String], required: true }
});

module.exports = mongoose.model('Medicine', MedicineSchema);