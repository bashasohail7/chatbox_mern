const { register, getAllUserNames, login } = require('../controllers/userController')

const router=require('express').Router()
router.post('/register',register)
router.post('/login',login)
router.get('/getAllNames',getAllUserNames)

module.exports=router