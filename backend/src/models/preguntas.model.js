"use strict";

const mongoose = require("mongoose");

//crea esquema de preguntas
const questionSchema = new mongoose.Schema({
    pregunta:{
        type:String,
        required: true,
    },
    Alternativa:{
        type: Array,
        length: 4,
        required: true,
    }
});

const preguntas = mongoose.model("preguntas",questionSchema);

module.exports= preguntas;