
"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const UserService = require("../services/user.service");
const { userBodySchema, userIdSchema } = require("../schema/user.schema");
const { handleError } = require("../utils/errorHandler");
// const Pregunta = require("../models/preguntas.model.js");

/**
 * Obtiene todos los usuarios
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
/*
async function getUsers(req, res) {
  try {
    const [usuarios, errorUsuarios] = await UserService.getUsers();
    if (errorUsuarios) return respondError(req, res, 404, errorUsuarios);

    usuarios.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, usuarios);
  } catch (error) {
    handleError(error, "user.controller -> getUsers");
    respondError(req, res, 400, error.message);
  }
}*/

/**
 * Crea un nuevo usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createUser(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = userBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [newUser, userError] = await UserService.createUser(body);

    if (userError) return respondError(req, res, 400, userError);
    if (!newUser) {
      return respondError(req, res, 400, "No se creo el usuario");
    }

    respondSuccess(req, res, 201, newUser);
  } catch (error) {
    handleError(error, "user.controller -> createUser");
    respondError(req, res, 500, "No se creo el usuario");
  }
}

/**
 * Obtiene un usuario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getUserById(req, res) {
  try {
    const { params } = req;
    // const { error: paramsError } = userIdSchema.validate(params);
    // if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [user, errorUser] = await UserService.getUserById(params.correo);

    if (errorUser) return respondError(req, res, 404, errorUser);
    respondSuccess(req, res, 200, user);
  } catch (error) {
    handleError(error, "user.controller -> getUserById");
    respondError(req, res, 500, "No se pudo obtener el usuario");
  }
}

/**
 * Actualiza un usuario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateUser(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = userIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = userBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [user, userError] = await UserService.updateUser(params.id, body);

    if (userError) return respondError(req, res, 400, userError);

    respondSuccess(req, res, 200, user);
  } catch (error) {
    handleError(error, "user.controller -> updateUser");
    respondError(req, res, 500, "No se pudo actualizar el usuario");
  }
}

/**
 * Elimina un usuario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function deleteUser(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = userIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const user = await UserService.deleteUser(params.id);
    !user
      ? respondError(
          req,
          res,
          404,
          "No se encontro el usuario solicitado",
          "Verifique el id ingresado",
        )
      : respondSuccess(req, res, 200, user);
  } catch (error) {
    handleError(error, "user.controller -> deleteUser");
    respondError(req, res, 500, "No se pudo eliminar el usuario");
  }
}

/**
 * generatest
 */
async function obtenerTest(req, res) {
  try {
      const Test = await UserService.obtenerPrueba(req.email, res);
      respondSuccess(req, res, 200, Test);
  } catch (error) {
      console.log(error);
  }
}

/**
 * corrige test
 */
async function corregirPrueba(req, res) {
  try {
    // const respuestas = req.body;
    // crear un contador de intentos
    const pruebaC = await UserService.corregirPrueba(req.email, req.body);
    respondSuccess(req, res, 200, pruebaC);
  } catch (error) {
    console.log(error);
  }
}

/**
 * Obtiene el usuario logueado
*/
async function Verme(req, res) {
  try {
    const user = await UserService.Verme2(req.email);
    if (user === "") return respondError(req, res, 404, "sin datos");
    respondSuccess(req, res, 200, user);
  } catch (error) {
    respondError(error);
  }
}

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  obtenerTest,
  corregirPrueba,
  Verme,
};
