const express = require('express');
const router = express.Router();
const userSerive = require("../service/user")

/**
 * @api {post} /api/user Add User
 * @apiVersion 0.0.1
 * @apiName addUser
 * @apiGroup User
 * @apiDescription Add new User.
 * 
 * @apiParam {String} email                                     Mandatory email user.
 * @apiParam {String} password                                  Mandatory password.
 * 
 * @apiSuccess {Boolean} status                                 Status of the api.
 * @apiSuccess {Object} user                                    Created user.
 * @apiSuccess {String} message                                 Message of the api.
 * @apiSuccess {Number} statusCode                              Status code of the api.
 * 
 */

router.post('/user', async (req, res, next) => {
  try{    
    const user = await userSerive.signup(req.body);
    return res.status(user.statusCode).json(user)
  }catch(err){
    next(err, req, res, next);
    throw err
  }
});


/**
 * @api {post} /api/login Login User
 * @apiVersion 0.0.1
 * @apiName loginUser
 * @apiGroup User
 * @apiDescription Login User.
 * 
 * @apiParam {String} email                                     Mandatory email user.
 * @apiParam {String} password                                  Mandatory password.
 * 
 * @apiSuccess {Boolean} status                                 Status of the api.
 * @apiSuccess {String} token                                   JWT token.
 * @apiSuccess {String} message                                 Message of the api.
 * @apiSuccess {Number} statusCode                              Status code of the api.
 * 
 */

router.post('/login', async (req, res, next) => {
  try{    
    const user = await userSerive.authenticate(req.body);
    return res.status(user.statusCode).json(user)
  }catch(err){
    next(err, req, res, next);
    throw err
  }
});

module.exports = router;
