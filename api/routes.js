const express = require("express");
const router = express.Router();
const {home } = require("./controllers/home")

router.get('/', home);

router.get('*', (req, res) => {
    res.status(404).json({
        message: 'Page Not Found',
        success:false
    });
});

module.exports = router;