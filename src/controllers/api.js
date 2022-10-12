const User = require('../db/models/').User;
const Budgets = require('../db/models/').Budgets;
const Category = require('../db/models/').Category;
const { validationResult } = require('express-validator');

let fields =  ['id', 'amount','description', 'type'];
const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};
const getPagingData = (count, page, limit) => {
    const totalPages = Math.ceil(count / limit);
    page = Number(page);
    const currentPage = page ? +page : 0;
    const prevPage = page ? page - 1 : -1;
    const nextPage = page<totalPages ? page + 1 : page - 1;    
    return { totalPages, currentPage, nextPage, prevPage };
};

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

    getAllBudgets: async (req, res, next) => {
        //Validation
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }  

        const page = req.query.page ? req.query.page :"0";
        const size =  req.query.size ? req.query.size : "10";
        const { limit, offset } = getPagination(page, size);

        let {count, rows} = await Budgets.findAndCountAll({
            offset: parseInt(offset),
            limit: parseInt(limit),
            include: [{association: "Category"}]
        });
        const { totalPages, currentPage, nextPage, prevPage } = getPagingData(count, page, limit) ;
        res.json({ count, budgets : rows, totalPages, currentPage, nextPage, prevPage })
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