const Product = require('./model')

//add product

const addProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      imageUrl
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add product to the database.' });
  }
};

//get products

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//payment

const crypto = require('crypto');
require('dotenv').config();

const merchantKey = process.env.MERCHANT_KEY;
const salt = process.env.SALT;

const generateHash = (data) => {
  const hashString = `${merchantKey}|${data.txnid}|${data.amount}|${data.productinfo}|${data.firstname}|${data.email}|||||||||||${salt}`;
  return crypto.createHash('sha512').update(hashString).digest('hex');
};

const initiatePayment = (req, res) => {
  const { product, email, phone, firstname } = req.body;

  if (!product || !email || !phone || !firstname) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const txnid = Math.random().toString(36).substring(2, 15); 
  const rawAmount = product.price.replace(/,/g, ''); 
  const amount = parseFloat(rawAmount).toFixed(2); 

  const productinfo = product.name; 
  const hash = generateHash({ txnid, amount, productinfo, firstname, email, phone });

  const paymentData = {
    key: merchantKey,
    txnid,
    amount, 
    productinfo,
    firstname,
    email,
    phone,
    hash,
    surl: "http://localhost:4004/payment/success", 
    furl: "http://localhost:4004/payment/failure", 
  };

  const formattedAmount = parseFloat(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  res.json({ paymentData, formattedAmount }); 
};


const paymentSuccess = (req, res) => {
  res.send("Payment successful!");
};

const paymentFailure = (req, res) => {
  res.send("Payment failed!");
};





module.exports = { addProduct, getAllProducts, initiatePayment, paymentSuccess, paymentFailure };