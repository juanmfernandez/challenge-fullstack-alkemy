const {Router} = require('express');
const { editFlow, addFlow, getError, getOneBudget, deleteFlow, getAllBudgets } = require('../controllers/api');
const { userCreate, userLogin } = require('../controllers/users');
const AuthToken = require('../middlewares/auth.token.middleware');
const {idValidator, createValidator, userCreateValidator, updateValidator, userLoginValidator} = require('../middlewares/validator.middleware')

const router = Router();


router.get('/', getAllBudgets)
router.get('/user', userCreate)
router.get('/:id', idValidator, getOneBudget)

router.post('/inflow/', createValidator, AuthToken, addFlow)
router.post('/user/', userCreateValidator, userCreate)
router.post('/user/login', userLoginValidator, userLogin)

router.put('/inflow/', idValidator, addFlow)
router.put('/inflow/:id', idValidator, updateValidator, AuthToken, editFlow)

router.delete('/inflow/:id', idValidator, AuthToken, deleteFlow)


module.exports = router;