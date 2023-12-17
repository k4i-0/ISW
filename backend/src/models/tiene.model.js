"use strict";

const mongoose = require("mongoose");

// crea esquema de preguntas
const tieneSchema = new mongoose.Schema({
    idPregunta: {
        type: mongoose.ObjectId,
        ref: "preguntas",
    },
    idPrueba: {
        type: mongoose.ObjectId,
        ref: "pruebas",
    },
});

const relacion = mongoose.model("tiene", tieneSchema);

module.exports= relacion;
