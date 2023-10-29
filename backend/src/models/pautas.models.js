"use strict";

const mongoose = require("mongoose");

//crea esquema de preguntas
const pautasSchema = new mongoose.Schema({
    respuesta:{
        type: String,
        require:true,
    }
});

const pautas = mongoose.model("pautas",pautasSchema);

module.exports= pautas;