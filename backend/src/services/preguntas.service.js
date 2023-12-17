"use strict";

const question = require("../models/preguntas.model.js");
const pautas = require("../models/pautas.models.js");
const relacion = require("../models/tiene.model.js");
const Prueba = require("../models/pruebas.model.js");
const { handleError } = require("../utils/errorHandler");
// const relacion = require("../models/tiene.model.js");


// funcion que devuelve las todas las preguntas de la base de datos

async function getPreguntas() {
    try {
        const preguntas = await question.find();
        return preguntas;
    } catch (error) {
        handleError(error, "preguntas.service -> trae");
    }
}


// funcion que crea una preguntas 

async function createPregunta(pre) {
    try {
        const { pregunta, Alternativa , respuesta} = pre;
        const busquedapregunta = await question.findOne({ pregunta: pregunta }).exec();
        if (busquedapregunta) return 400;
        const newquestion = new question( {
            pregunta,
            Alternativa,
            respuesta,
        }).save();

        return newquestion;
    } catch (error) {
        console.log(error);
    }
}

/*
//crea una pauta
async function createPauta(respuesta){
    try {
        const newpauta = new pautas({
            respuesta
        }).save();
        return newpauta;
    } catch (error) {
        console.log(error);
    }
}
*/

async function crearPrueba() {
    try {
        const Pruebas = await Prueba.find();
        let ultimaPruebas = null;
        if ( Pruebas[Pruebas.length-1] !== undefined ) {
            ultimaPruebas = await relacion.find(
                { idPrueba: Pruebas[Pruebas.length-1].id.toString() });
        } else {
            ultimaPruebas = 0;
        }
        if ( ultimaPruebas === 0 || ultimaPruebas.length >5 ) {
            const newPrueba = new Prueba({
                estado: "creado",
            }).save();
            return newPrueba;  
        } else {
            return Pruebas[Pruebas.length-1];
        }
    } catch (error) {
        console.log(error);
    }
}

async function crearRelacion(idPregunta, idPrueba) {
    try {
       const crearRelacion = new relacion({
        idPregunta,
        idPrueba,
       }).save();
       return crearRelacion;
    } catch (error) {
        console.log(error);
    }
}

async function deletePregunta(id){
    try {

        const temp = await relacion.find({idPregunta:id});
        const eliminarPauta = await pautas.findByIdAndDelete(temp[0].isPauta);
        const eliminarRelacion = await relacion.findByIdAndDelete(temp[0]._id);
        const eliminarQuestion = await question.findByIdAndDelete(id);
        return [eliminarQuestion]
    } catch (error) {
        console.log(error);
    }
}
async function updatePregunta(cambio) {
    try {
        // comprobar si la respuesta esta en la alternativas
        for ( let i=0; i<4; i++) {
            if (cambio.Alternativa[i] != cambio.respuesta) {
                return "Respuesta no encontrada en alternativas";
            }
        }
        const updatePregunta = await question.findByIdAndUpdate(
            cambio.id,
            {
                pregunta: cambio.pregunta,
                Alternativa: cambio.Alternativa,
                respuesta: cambio.respuesta,
            },
            { new: true },
        );
        /* const encontrarPauta = await relacion.find({ idPregunta: cambio.id });
        const updatePauta = await pautas.findByIdAndUpdate(
            encontrarPauta.idPauta,
            {
                respuesta: cambio.respuesta,
            },
            { new: true },
        );*/
        return updatePregunta;
    } catch (error) {
        console.log(error);
    }
}


module.exports={
    createPregunta,
    getPreguntas,
    deletePregunta,
    updatePregunta,
    crearRelacion,
    crearPrueba,
};
