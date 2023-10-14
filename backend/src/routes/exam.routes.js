const express = require('express');
const router = express.Router();
const examController = require('../controllers/exam.controller');
//Ruta para la toma de hora de examenes
router.post('/exams/schedule', examController.scheduleExam);
module.exports = router;