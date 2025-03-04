const PrecautionSchema = new mongoose.Schema({
    disease: { type: String, required: true },
    precautions: { type: [String], required: true }
});

module.exports = mongoose.model('Precaution', PrecautionSchema);