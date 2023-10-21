"use strict";

const QuestionService = require("../services/preguntas.service");
const express = require("express");


async function createPregunta(req,res){
    try {
        const {body} = req;
        const newPregunta = await QuestionService.createPregunta(body);
        res.status(200).send(newPregunta);
    } catch (error) {
        console.log(error);
    }
}

async function deletePregunta(req,res){
    try {
        const {params} = req;
        console.log(params.id)
        const preguntaDelete = await QuestionService.deletePregunta(params.id);
        res.status(204).send(preguntaDelete);
    } catch (error) {
        console.log(error);
    }
}

async function getPreguntas(req,res){
    try{
        const verPreguntas = await QuestionService.getPreguntas();
        res.status(200).send(verPreguntas);
    } catch (error) {
        console.log(error);
    }
}

async function updatePregunta(req,res){
    try {
        const cambio= req.body;
        const updateQuestion = await QuestionService.updatePregunta(cambio);
        res.status(200).send(updateQuestion);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createPregunta,
    deletePregunta,
    getPreguntas,
    updatePregunta
};