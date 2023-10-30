"use strict";
// Importa el modelo de datos 'User'
const User = require("../models/user.model.js");
const Role = require("../models/role.model.js");
const Pauta = require("../models/pautas.models.js");
const Prueba = require("../models/pruebas.model.js");
const Pregunta = require("../models/preguntas.model.js");
const { handleError } = require("../utils/errorHandler");
const { object } = require("joi");
const relacion = require("../models/tiene.model.js");

/**
 * Obtiene todos los usuarios de la base de datos
 * @returns {Promise} Promesa con el objeto de los usuarios
 */
async function getUsers() {
  try {
    const users = await User.find()
      .select("-password")
      .populate("roles")
      .exec();
    if (!users) return [null, "No hay usuarios"];

    return [users, null];
  } catch (error) {
    handleError(error, "user.service -> getUsers");
  }
}

/**
 * Crea un nuevo usuario en la base de datos
 * @param {Object} user Objeto de usuario
 * @returns {Promise} Promesa con el objeto de usuario creado
 */
async function createUser(user) {
  try {
    const { username, email, password, roles } = user;

    const userFound = await User.findOne({ email: user.email });
    if (userFound) return [null, "El usuario ya existe"];

    const rolesFound = await Role.find({ name: { $in: roles } });
    if (rolesFound.length === 0) return [null, "El rol no existe"];
    const myRole = rolesFound.map((role) => role._id);

    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
      roles: myRole,
    });
    await newUser.save();

    return [newUser, null];
  } catch (error) {
    handleError(error, "user.service -> createUser");
  }
}

/**
 * Obtiene un usuario por su id de la base de datos
 * @param {string} Id del usuario
 * @returns {Promise} Promesa con el objeto de usuario
 */
async function getUserById(id) {
  try {
    const user = await User.findById({ _id: id })
      .select("-password")
      .populate("roles")
      .exec();

    if (!user) return [null, "El usuario no existe"];

    return [user, null];
  } catch (error) {
    handleError(error, "user.service -> getUserById");
  }
}

/**
 * Actualiza un usuario por su id en la base de datos
 * @param {string} id Id del usuario
 * @param {Object} user Objeto de usuario
 * @returns {Promise} Promesa con el objeto de usuario actualizado
 */
async function updateUser(id, user) {
  try {
    const userFound = await User.findById(id);
    if (!userFound) return [null, "El usuario no existe"];

    const { username, email, password, newPassword, roles } = user;

    const matchPassword = await User.comparePassword(
      password,
      userFound.password,
    );

    if (!matchPassword) {
      return [null, "La contraseña no coincide"];
    }

    const rolesFound = await Role.find({ name: { $in: roles } });
    if (rolesFound.length === 0) return [null, "El rol no existe"];

    const myRole = rolesFound.map((role) => role._id);

    const userUpdated = await User.findByIdAndUpdate(
      id,
      {
        username,
        email,
        password: await User.encryptPassword(newPassword || password),
        roles: myRole,
      },
      { new: true },
    );

    return [userUpdated, null];
  } catch (error) {
    handleError(error, "user.service -> updateUser");
  }
}

/**
 * Elimina un usuario por su id de la base de datos
 * @param {string} Id del usuario
 * @returns {Promise} Promesa con el objeto de usuario eliminado
 */
async function deleteUser(id) {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "user.service -> deleteUser");
  }
}


//funcion crea prueba y se la envia al usuario postulante, validar en index
async function obtenerPrueba(id){
  try {
    const users = await User.find({email:id})
    const verificar = await Prueba.find({postulante:users[0]._id});
    const test = await Prueba.find();
    var ultimo
    if(test.length === 0){
      ultimo = test.length
    }else{
      ultimo = test.length-1
    }

    if(verificar.length === 0 ){
      //asigna prueba a postulante
      await Prueba.updateOne({_id:test[ultimo].id},{postulante:users[0].id});
      const buscar = await relacion.find({idPrueba:test[ultimo].id});
      //asigna pregunta al array test 2
      const test2 = [];
      for(let i=0;i<buscar.length;i++){
        test2.push(await Pregunta.find({_id:buscar[i].idPregunta.toString()}))
      }
      //aleatoriza el array
      test2.sort(function() { return Math.random() - 0.5 });
      //agregar id prueba al array
      test2.push(await Prueba.find({_id:test[ultimo]._id.toString()}));
      return test2;
    }
    //retorna en caso que si exista
    //mostrar la preguntas de la prueba con una funcion
    return verificar;
  } catch (error) {
    console.log(error);
  }
}

async function corregirPrueba(resp){
  try {
    const prueba = await Prueba.findById(resp.id);
    const busqueda = await relacion.find({idPrueba:prueba.id});
    var validador = 0;
    for(let i=0;i<resp.respuesta.length;i++){
      for(let j=0;j<busqueda.length;j++){
        if(resp.respuesta[i].id === busqueda[j].idPregunta){
            var coreccion = await Pauta.find({id:busqueda[j].isPauta});
            if(resp.respues[i].res !== coreccion[0].respuesta){
              validador++
            }
        }
      }
    }  
    if(validador > 0 ){
      console.log("repobado");
      await User.updateOne({_id:resp.id},{estadoPostulacion:"Aprobado Teorico"});
      return ["reprobado"]
    }else{
      console.log("aprobado");
      await User.updateOne({_id:resp.id},{estadoPostulacion:"Aprobado Teorico"})
      return ["aprobado"]
    }

  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  corregirPrueba,
  obtenerPrueba
};
