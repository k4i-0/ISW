"use strict";
// Autorizacion - Comprobar el rol del usuario
const User = require("../models/user.model.js");
const Role = require("../models/role.model.js");
const { respondError } = require("../utils/resHandler.js");
const { handleError } = require("../utils/errorHandler.js");

/**
 * Comprueba si el usuario es administrador
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para continuar con la siguiente función
 */
async function isAdmin(req, res, next) {
  try {
    const user = await User.findOne({ email: req.email });
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }
    return respondError(
      req,
      res,
      401,
      "Se requiere un rol de administrador para realizar esta acción",
    );
  } catch (error) {
    handleError(error, "authorization.middleware -> isAdmin");
  }
}

//es examinador
async function isExaminador(req,res,next){
  try {
    const user = await User.findOne({ email: req.email });
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "Examinador") {
        next();
        return;
      }
    }
    return respondError(
      req,
      res,
      401,
      "Se requiere un rol de Examinador para realizar esta acción",
    );
  } catch (error) {
    console.log(error);    
  }
}

//es postulante
async function isPostulante(req,res,next){
  try {
    const user = await User.findOne({ email: req.email });
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "Postulante") {
        next();
        return;
      }
    }
    return respondError(
      req,
      res,
      401,
      "Se requiere un rol de Postulante para realizar esta acción",
    );
  } catch (error) {
    console.log(error);    
  }
}

//tiene doc listos
async function darPruebateorica(req,res,next){
  try {
    const user = await User.findOne({ email: req.email });
    if(user.estadoPostulacion === "Documentos Listos"){
      next();
      return;
    }else{
      return respondError(
        req,
        res,
        401,
        "No tiene sus documentos aprobados",
      );
    }
  } catch (error) {
    console.log(error);    
  }
}

//funcion comprobar fecha en calendario
async function eslaFecha(req,res,next){
  try {
    const user = await User.findOne({ email: req.email });
    const fecha = await Calendario.find({user:user.id});
    const hoy = new Date()
    if(hot.toISOString() === fecha.fechaA){
      next();
      return;
    }else{
      return respondError(
        req,
        res,
        401,
        "Aun no puedes dar el test",
      );
    }
  } catch (error) {
    console.log(error);    
  }
}


async function dioPruebaTeorica(req,res,next){
  try {
    const user = await User.findOne({ email: req.email });
    console.log(user.estadoPostulacion)
    if(user.estadoPostulacion !== "Aprobado Teorico"){
      next();
      return;
    }else{
      return respondError(
        req,
        res,
        401,
        "Usted ya aprobo esta prueba",
      );
    }
  } catch (error) {
    console.log(error);    
  }
}

module.exports = {
  isAdmin,
  isExaminador,
  isPostulante,
  darPruebateorica,
  eslaFecha,
  dioPruebaTeorica
};
