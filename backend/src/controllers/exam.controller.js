const Exam = require('../models/exam.model');

async function scheduleExam(req, res) {
    try {
        const { date, time } = req.body;
        const newExam = new Exam({
            date,
            time,
        });

        // Guarda el nuevo examen en la base de datos
        const examSaved = await newExam.save();

        // Responde con un código 201 (Created) y el examen guardado
        res.status(201).json(examSaved);
    } catch (error) {
        // Manejo de errores: responde con un código 400 (Bad Request) y el error
        res.status(400).json({ error: error.message });
    }
}

module.exports = { scheduleExam };
