const {Router} = require('express');
const { editFlow, addFlow, getError, getOneBudget, deleteFlow, getAllBudgets } = require('../controllers/api');
const { userCreate, userLogin } = require('../controllers/users');
const {idValidator, createValidator, userCreateValidator, updateValidator, userLoginValidator} = require('../middlewares/validator.middleware')
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
router.get('/user', userCreate)
router.get('/:id', idValidator, getOneBudget)


router.post('/inflow/', createValidator, addFlow)
router.post('/user/', userCreateValidator, userCreate)
router.post('/user/login', userLoginValidator, userLogin)

router.put('/inflow/', idValidator, addFlow)
router.put('/inflow/:id', idValidator, updateValidator, editFlow)
router.delete('/inflow/:id', idValidator, deleteFlow)

//router.put('/outflow/', createUpdateValidator, addFlow)


module.exports = router;