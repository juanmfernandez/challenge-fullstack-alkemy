const {Router} = require('express');
const { editFlow, addFlow, getError, getOneBudget, deleteFlow, getAllBudgets } = require('../controllers/api');
const {idValidator, createValidator, updateValidator} = require('../middlewares/validator.middleware')
const router = Router();

//Unhappy routes
/*
router.get('/inflow', idValidator, getBalance)
router.post('/inflow', idValidator, getError)
router.put('/inflow', idValidator, getError)
router.delete('/inflow', idValidator, getError)
router.delete('/inflow', idValidator, getError)
router.get('/inflow', idValidator, getError)
*/

//Happy routes
//router.get('/', (req, res) => res.json({msg: 'Hello World!'}))
router.get('/', getAllBudgets)
router.get('/:id', idValidator, getOneBudget)

router.post('/inflow/', createValidator, addFlow)

router.put('/inflow/', idValidator, addFlow)
router.put('/inflow/:id', idValidator, updateValidator, editFlow)
router.delete('/inflow/:id', idValidator, deleteFlow)

//router.put('/outflow/', createUpdateValidator, addFlow)


module.exports = router;