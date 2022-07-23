const express = require('express');
const jwt = require("jsonwebtoken");
const router = express.Router();
const {generateToken, authenticateToken} = require('../utils/auth')


const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

// Here are creating 
require('../controllers/user.controller')(prisma,router,generateToken);
require('../controllers/book.controller')(prisma,router,authenticateToken);


module.exports = router;

