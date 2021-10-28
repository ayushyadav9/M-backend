const express = require("express");
const router = express.Router();
const {home} = require("./controllers/home");
const passport = require('passport');
const { addProduct,getProducts,getProduct,getProductsByCategory } = require("./controllers/products");
const {register,login, googleSignup} = require("./controllers/user")


router.get('/', home)


router.post('/register',register)
router.post('/login',login)
router.post('/googleSignup',googleSignup)


router.post('/addProduct',addProduct)
router.get('/getProducts',getProducts)
router.get('/getProduct/:id',getProduct)
router.get('/getProducts/:category',passport.authenticate('jwt', { session:false }),getProductsByCategory)

router.get('*', (req, res) => {
    res.status(404).json({
        message: 'Page Not Found',
        success:false
    });
});

module.exports = router;