"use strict";

const question = require("../models/preguntas.model.js");
// const pautas = require("../models/pautas.models.js");
const relacion = require("../models/tiene.model.js");
const Prueba = require("../models/pruebas.model.js");
const { handleError } = require("../utils/errorHandler");
// const relacion = require("../models/tiene.model.js");


/**
 * funcion que devuelve las todas las preguntas de la base de datos
 */
async function getPreguntas() {
    try {
        const preguntas = await question.find();
        return preguntas;
    } catch (error) {
        handleError(error, "preguntas.service -> trae");
    }
}


/**
 * funcion que crea una preguntas
 */
async function createPregunta(pre) {
    try {
        const { pregunta, Alternativa, respuesta } = pre;
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

/**
 * Devulve todas las pruebas
 */
async function getPruebas() {
    try {
        const Bprubas = await Prueba.find().lean(); // lean() cambia formato
        const Brelacion = await relacion.find().lean();
        const Bpreguntas = await question.find().lean();
        const Tests = [];
        const cantPruebas = Bprubas.length;
        const cantPreguntas = Bpreguntas.length;
        const cantRelaciones = Brelacion.length;
        for (let i = 0; i<cantPruebas; i++ ) {
            Tests.push(Bprubas[i]);
            for ( let j =0; j<cantRelaciones; j++ ) {
                if (Bprubas[i]._id.toString() == Brelacion[j].idPrueba.toString()) {
                    const TestAux = [];
                    for ( let k = 0; k<cantPreguntas; k++) {
                        if (Brelacion[j].idPregunta.toString() == Bpreguntas[k]._id.toString()) {
                            TestAux.push(Bpreguntas[k]);
                        }
                    }
                    // Tests[i].Preguntas = TestAux;
                    if (Tests[i].Preguntas == undefined) {
                        Tests[i].Preguntas = [TestAux[0]];
                    } else {
                        Tests[i].Preguntas.push(TestAux[0]);
                    }
                }
            }
        }
        return Tests;     
    } catch (error) {
        
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

/**
 * Crea una prueba
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

/**
 * crea tabla relacion entre pregunta y prueba
 */
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

/**
 * elimina una pregunta
 */
async function deletePregunta(id) {
    try {
        const temp = await relacion.find({ idPregunta: id });
        // const eliminarPauta = await pautas.findByIdAndDelete(temp[0].isPauta);
        await relacion.findByIdAndDelete(temp[0]._id);
        const eliminarQuestion = await question.findByIdAndDelete(id);
        return [eliminarQuestion];
    } catch (error) {
        console.log(error);
    }
}

/**
 * Actualiza una pregunta en base a su id como parametro obiligatorio
 * Verifica que exista la pregunta en el array alternativas
 * y que no halla mas de 1 conincidencia
 */
async function updatePregunta(cambio) {
    try {
        // comprobar si la respuesta esta en la alternativas
        let aux;
        for ( let i=0; i<4; i++) {
            if (cambio.Alternativa[i] != cambio.respuesta) {
                aux++;
            }
        }
        if ( aux > 1) {
            return "Respuesta duplucada en Alternativas";
        }
        if ( aux = 0) {
            return "Respuesta no encontrada en alternativas";
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
    getPruebas,
};
