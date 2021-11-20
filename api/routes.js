const express = require("express");
const router = express.Router();
const {home,sendMail} = require("./controllers/home");
const passport = require('passport');
const { addProduct,getProducts,getProduct,getProductsByCategory } = require("./controllers/products");
const {register,login, googleSignup, getUsers} = require("./controllers/user")
const { addHints,getHint } = require("./controllers/hints")
const {sendScore} = require("./controllers/score")


router.get('/', home)


router.post('/register',register)
router.post('/login',login)
router.post('/googleSignup',googleSignup)
router.get('/getUsers',passport.authenticate('jwt', { session:false }),getUsers)

router.get('/sendMail',sendMail)


router.post('/addProduct',addProduct)
router.get('/getProducts',getProducts)
router.get('/getProduct/:id',getProduct)
// router.get('/getProducts/:category',passport.authenticate('jwt', { session:false }),getProductsByCategory)
router.post('/addHint',addHints)
router.get('/getHint',passport.authenticate('jwt', { session:false }),getHint)
router.post('/sendScore',passport.authenticate('jwt', { session:false }),sendScore)

router.get('*', (req, res) => {
    res.status(404).json({
        message: 'Page Not Found',
        success:false
    });
});

module.exports = router;