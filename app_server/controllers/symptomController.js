const Medicine = require('../model/medicineDB');
const Precaution = require('../model/precautionDB');

exports.getTreatment = async (req, res) => {
    const { disease } = req.body;
    try {
        const medicines = await Medicine.findOne({ disease });
        const precautions = await Precaution.findOne({ disease });
        res.json({ medicines, precautions });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};