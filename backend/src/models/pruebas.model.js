"use strict";

const mongoose = require("mongoose");
const ESTADOS = require("../constants/estados.constants");

// crea esquema de prueba
const pruebasSchema = new mongoose.Schema({
    estado: {
        type: String,
        enum: ESTADOS,
    },
    postulante: {
        type: mongoose.ObjectId,
        ref: "user",
      },
});

const prueba = mongoose.model("pruebas", pruebasSchema);

module.exports= prueba;
