"use strict";

const question = require("../models/preguntas.model.js");
const pautas = require("../models/pautas.models.js");
const relacion = require("../models/tiene.model.js");
const Prueba = require("../models/pruebas.model.js");
const { handleError } = require("../utils/errorHandler");


//funcion que devuelve las todas las preguntas de la base de datos

async function getPreguntas(){
    try {
        const preguntas = await question.find();
        const pautaVer = await pautas.find();
        return [preguntas,pautaVer];
    } catch (error) {
        handleError(error, "preguntas.service -> trae");
    }
}


// funcion que crea una preguntas 

async function createPregunta(pre){
    try {
        const {pregunta,Alternativa} = pre;
        const busquedapregunta = await question.findOne({pregunta: pregunta}).exec();
        if(busquedapregunta) return 400
        const newquestion = new question({
            pregunta,
            Alternativa
        }).save();

        return newquestion;
    } catch (error) {
        console.log(error);
    }
}

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


async function deletePregunta(id){
    try {
        const eliminarRelacion = await relacion.findByIdAndDelete(id);
        const eliminarQuestion = await question.findByIdAndDelete(id);
        return [eliminarQuestion]
    } catch (error) {
        console.log(error);
    }
}
async function updatePregunta(cambio){
    try {
        const updatePregunta = await question.findByIdAndUpdate(
            cambio.id,
            {
                pregunta : cambio.pregunta,
                Alternativa: cambio.Alternativa
            },
            {new:true}
        );
        const encontrarPauta = await relacion.find({idPregunta:cambio.id});
        const updatePauta = await pautas.findByIdAndUpdate(
            encontrarPauta.idPauta,
            {
                respuesta:cambio.respuesta
            },
            {new:true}
        );
        return [updatePregunta,updatePauta];
    } catch (error) {
        console.log(error);
    }
}

async function crearRelacion(idPregunta,idPauta,idPrueba){
    try {
       const crearRelacion = new relacion({
        idPregunta,
        idPauta,
        idPrueba
       }).save()
       return crearRelacion;
    } catch (error) {
        console.log(error);
    }
}

async function crearPrueba(){
    try {
        const Pruebas = await Prueba.find();
        const ultimaPruebas = await relacion.find({idPrueba:Pruebas[Pruebas.length-1].id});
        console.log(ultimaPruebas);
        if(ultimaPruebas.length === 0 || ultimaPruebas.length >5){
            const newPrueba= new Prueba({
                estado:"creado",
            }).save();
            return newPrueba;  
        }else{
            return Pruebas[Pruebas.length-1];
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    createPregunta,
    getPreguntas,
    deletePregunta,
    updatePregunta,
    createPauta,
    crearRelacion,
    crearPrueba
};