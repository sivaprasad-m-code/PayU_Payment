const express = require('express');
const router = express.Router();

const controller=require('./controller')

router.post('/add',controller.addProduct)
router.get('/get',controller.getAllProducts)
router.post('/payment',controller.initiatePayment)
router.get('/success',controller.paymentSuccess)
router.get('/failure',controller.paymentFailure)











module.exports = router;