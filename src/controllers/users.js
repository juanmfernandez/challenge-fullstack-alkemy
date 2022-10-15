
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../db/models/').User;

const Users = {
    userCreate: async (req, res) => {
        //Validation
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }   
        req.body.password = bcryptjs.hashSync(req.body.password, 10)
        await User.create(req.body)
            .then((data) => {
                res.json({data:data})
            })
            .catch((error) => {
                res.json({error:error})
            })
    },

    userLogin: async (req, res) => {
        //Validation
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }   

        let userToLogin;
        try {
            userToLogin = await User.findOne({ where: { email: req.body.email } })
        }catch (error) {
            return res.status(400).json({error: "Se ha producido un error"})
        }

        if(!userToLogin || !bcryptjs.compareSync(req.body.password, userToLogin.password)){
            res.status(401).json({"msg": "Datos incorrectos"})
        }

        const tokenData = {
            id: userToLogin.id,
            email: userToLogin.email
        }

        const token = jwt.sign(tokenData, process.env.SECRET)

        //delete userToLogin.password;

        res.send({
            email: userToLogin.email,
            token
        })
    }
}

module.exports = Users;