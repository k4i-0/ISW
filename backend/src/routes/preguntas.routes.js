"use strict";

const express = require("express");

// controlador
const preguntaController = require("../controllers/examinador.controller");

// autorizacion
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

// autenticacion
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

// enrrutador
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// rutas
router.get("/", authorizationMiddleware.isExaminador, preguntaController.getPreguntas);
router.get("/pruebas", authorizationMiddleware.isExaminador, preguntaController.getPruebas);
router.post("/", authorizationMiddleware.isExaminador, preguntaController.createPregunta);
router.delete("/:id", authorizationMiddleware.isExaminador, preguntaController.deletePregunta);
router.put("/", authorizationMiddleware.isExaminador, preguntaController.updatePregunta);

// exporto
module.exports = router; 
