const User = require('../db/models/').User;
const Budgets = require('../db/models/').Budgets;
const Category = require('../db/models/').Category;
const { validationResult } = require('express-validator');

const api = {   

    getOneBudget: (req, res, next) => {
        //Validation
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }   
        Budgets.findOne({
            where: {id: req.params.id}
        })
            .then((data) => {
                res.json({data:data})
            })
            .catch((error) => {
                res.json({error:error})
            })
    },

    addFlow: (req, res, next) => {
        //validations
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }           
        Budgets.create(req.body)
            .then((data) => {
                res.json({data:data})
            })
            .catch((error) => {
                res.json({error:error})
            })
    },

    editFlow: (req, res, next) => {
        //validations
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        
        Budgets.update(req.body, {
            where: {id: req.params.id}
        })
            .then((data) => {
                res.json({data:data})
            })
            .catch((error) => {
                res.json({error:error})
            })
    },

    deleteFlow: (req, res, next) => {
        //validations
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        
        Budgets.destroy({
            where: {id: req.params.id}
        })
            .then((data) => {
                res.json({data:data})
            })
            .catch((error) => {
                res.json({error:error})
            })
    },

    getError: (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(405).json({errors: errors.array()})
        }
    }
}

module.exports = api;