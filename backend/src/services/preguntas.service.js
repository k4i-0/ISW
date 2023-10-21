"use strict";

const question = require("../models/preguntas.model.js");
const { findByIdAndUpdate } = require("../models/user.model.js");
const { handleError } = require("../utils/errorHandler");


//funcion que devuelve las todas las preguntas de la base de datos

async function getPreguntas(){
    try {
        const preguntas = await question.find();
        return [preguntas,null];
    } catch (error) {
        handleError(error, "preguntas.service -> trae");
    }
}


// funcion que crea una preguntas 

async function createPregunta(pre){
    try {
        const {pregunta,Alternativa} = pre;
        //crear verificador de pregunta existente
        const newquestion = new question({
            pregunta,
            Alternativa
        }).save();

        return newquestion;
    } catch (error) {
        console.log(error);
    }
}

async function deletePregunta(id){
    try {
        return await question.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    }
}
async function updatePregunta(cambio){
    try {
        const updateP = await question.findByIdAndUpdate(
            cambio.id,
            {
                pregunta : cambio.pregunta,
                Alternativa: cambio.Alternativa
            },
            {new:true}
        );
        return updateP;
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    createPregunta,
    getPreguntas,
    deletePregunta,
    updatePregunta
};