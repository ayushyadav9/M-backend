const express = require("express");
const router = express.Router();
const {home} = require("./controllers/home");
const { addProduct,getProducts } = require("./controllers/products");
const {register,login} = require("./controllers/user")


router.get('/', home)


router.post('/register',register)
router.post('/login',login)


router.post('/addProduct',addProduct)
router.get('/getProducts',getProducts)

router.get('*', (req, res) => {
    res.status(404).json({
        message: 'Page Not Found',
        success:false
    });
});

module.exports = router;