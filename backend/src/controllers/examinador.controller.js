"use strict";

const QuestionService = require("../services/preguntas.service");

// const express = require("express");


// tipo de formato de pregunta, se setea en front-end
/*
{
"pregunta":"Donde esta chile",
"Alternativa":["america del norte","america del sur","Europa","asia"]
"respuesta":"america del sur"
}
*/
async function createPregunta( req, res) {
    try {
        const { body } = req;
        const newPregunta = await QuestionService.createPregunta(body);
        if (newPregunta === 400) return res.status(400).send("pregunta ya existe");
        /*
        const newpauta = await QuestionService.createPauta(body.respuesta);
        if(newpauta === 400) return res.status(200).send("pauta ya existe");
        */
        const newPrueba = await QuestionService.crearPrueba(req.email);
        await QuestionService.crearRelacion(newPregunta._id, newPrueba._id);
        return res.status(200).send( [newPregunta, newPrueba] );
    } catch (error) {
        console.log(error);
    }
}

async function deletePregunta(req, res) {
    try {
        const { params } = req;
        // console.log(params.id)
        await QuestionService.deletePregunta(params.id);
        return res.status(200).send("Eliminada con exito");
    } catch (error) {
        console.log(error);
    }
}

async function getPreguntas(req, res) {
    try {
        const verPreguntas = await QuestionService.getPreguntas();
        return res.status(200).send(verPreguntas);
    } catch (error) {
        console.log(error);
    }
}

async function updatePregunta(req, res) {
    try {
        const cambio= req.body;
        const updateQuestion = await QuestionService.updatePregunta(cambio);
        return res.status(200).send(updateQuestion);
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    createPregunta,
    deletePregunta,
    getPreguntas,
    updatePregunta,
};
