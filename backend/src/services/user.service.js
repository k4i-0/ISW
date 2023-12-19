"use strict";
// Importa el modelo de datos 'User'
const User = require("../models/user.model.js");
const Role = require("../models/role.model.js");
// const Pauta = require("../models/pautas.models.js");
const Prueba = require("../models/pruebas.model.js");
const Pregunta = require("../models/preguntas.model.js");
const { handleError } = require("../utils/errorHandler");
// const { object } = require("joi");
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
/*
async function getUserById(correo) {
  try {
    const user = await User.find({ email: correo })
      .exec();

    if (!user) return [null, "El usuario no existe"];

    return [user[0], null];
  } catch (error) {
    handleError(error, "user.service -> getUserById");
  }
}*/

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

/**
 * Crea una prueba y se la envia al postulante
 * @param {string} id correo usuario
 * @returns {Promise} Promesa 
 */
async function obtenerPrueba( id ) {
  try {
    const users = await User.find({ email: id });
    const verificar = await Prueba.find({ postulante: users[0]._id });
    const test = await Prueba.find();
    let ultimo;
    if ( test.length === 0 ) {
      ultimo = test.length;
    } else {
      ultimo = test.length-1;
    }
    if ( verificar.length === 0 ) {
     // asigna prueba a postulante
    await Prueba.updateOne({ _id: test[ultimo].id }, { postulante: users[0].id });
    }
    const buscar = await relacion.find({ idPrueba: test[ultimo].id });
    // asigna pregunta al array test 2
    const test2 = [];
    for ( let i=0; i<buscar.length; i++ ) {
      const aux = await Pregunta.find({ _id: buscar[i].idPregunta.toString() });
      test2.push( aux[0] );
    }
    // aleatoriza el array
    // test2.sort(function() { return Math.random() - 0.5 });
    // agregar id prueba al array
    // const aux1 = await Prueba.find({ _id: test[ultimo]._id.toString() });
    // test2.push(aux1[0]);
    return test2;
  } catch (error) {
    console.log(error);
  }
}
/**
 * Corrige Prueba enviada por el usuario
 * @param {string} resp la respuesta
 * @returns {Promise} Promesa
 */
async function corregirPrueba( correo, res) {
  try {
    // console.log(correo);
    const userT = await User.find({ email: correo });
    // console.log(userT);
    const pruebasT = await Prueba.find({ postulante: userT[0]._id });
    // console.log(pruebasT);
    const preguntasT = await Pregunta.find();
    // console.log(preguntasT);
    const relacionT = await relacion.find({ idPrueba: pruebasT[0]._id });
    // console.log(relacionT);
    const arrayCorreccion = [];
    for ( let i =0; i< relacionT.length; i++ ) {
      for (let j =0; j<preguntasT.length; j++) {
        if (relacionT[i].idPregunta.toString() == preguntasT[j]._id.toString()) {
          arrayCorreccion.push(preguntasT[j].respuesta);
        }
      }
    }
    let eva = 0;
    for (let i=0; i<res.length; i++) {
      for (let j=0; j<arrayCorreccion.length; j++) {
        if (arrayCorreccion[j][0]=== res[i][0]) {
          eva++;
        }
      }
    }

    if (eva == res.length) {
       await User.updateOne({ _id: userT[0]._id }, 
        { estadoPostulacion: "Aprobado Teorico" });
        return ["Aprobado"];
    } else {
      await User.updateOne({ _id: userT[0]._id }, 
        { estadoPostulacion: "reprobado Teorico" });
        return "Reprobado";
    }

    /*
    const prueba = await Prueba.findById( resp.id );
    if ( prueba === null ) {
      return "No exite prueba o ingreso mal los datos";
    }
    const busqueda = await relacion.find({ idPrueba: prueba.id });
    let validador = 0;
    for ( let i=0; i<resp.respuesta.length; i++ ) {
      for ( let j=0; j<busqueda.length; j++ ) {
        if ( resp.respuesta[i].id === busqueda[j].idPregunta.toString() ) {
            const coreccion = await Pauta.find({ _id: busqueda[j].isPauta.toString() } );
            if ( resp.respuesta[i].res !== coreccion[0].respuesta ) {
              validador++;
            }
        }
      }
    } 
    if (validador > 0 ) {
      const prueba = await Prueba.findOne({ _id: resp.id });

      await User.updateOne({ _id: prueba.postulante.toString() }, 
      { estadoPostulacion: "reprobado Teorico" });

      return ["reprobado"];
    } else {
      const prueba = await Prueba.findOne({ _id: resp.id });

      await User.updateOne({ _id: prueba.postulante.toString() }, 
      { estadoPostulacion: "Aprobado Teorico" });

      return ["aprobado"];
    }
    */
  } catch (error) {
    console.log(error);
  }
}

/**
 * Obtiene un usuario por su id de la base de datos
 * @param {string} Id del usuario
 * @returns {Promise} Promesa con el objeto de usuario
 */
async function Verme2(correo) {
  try {
    const user = await User.findOne({ email: correo });
    if (!user) return [null, "El usuario no existe"];
    return user;
  } catch (error) {
    handleError(error, "user.service -> getUserById");
  }
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  corregirPrueba,
  obtenerPrueba,
  Verme2,
};
