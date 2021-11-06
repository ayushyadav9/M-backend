const Hints = require("../../models/Hints");
const User = require("../../models/User");
const Products = require("../../models/Product");

module.exports.addHints = async (req,res)=>{
    try {
        let hint = new Hints({
            hintStatement: req.body.hint,
            category: req.body.cat,
            level: req.body.level
        })
        await hint.save();
        res.status(200).json({
            message: 'Added Successfully',
            data: {
                hint: hint
            },
            success: true,
        });

    } catch (err) {
        res.status(500).json({
            error: err.message,
            message: 'Something went wrong',
            success: false,
        });
    }
}

module.exports.getHint = async(req,res)=>{
    try {
        let user = await User.findById(req.user._id).select(['-password','-provider']);
        if(user.currentHint){
            let hint = await Hints.findById(user.currentHint)
            let products = await Products.find({category:hint.category})
            let product  = products[Math.floor(Math.random() * products.length)];
            let prod = await Products.find({})
            prod  = prod[Math.floor(Math.random() * prod.length)];
            return res.status(200).json({
                message: 'Fetched Successfully',
                data: {
                    user:user,
                    hint: hint,
                    productId: product._id,
                    universalProduct: prod
                },
                success: true,
            });
        }
        let hints = await Hints.find({});
        const hint = hints[Math.floor(Math.random() * hints.length)];
        let products = await Products.find({category:hint.category})
        let product  = products[Math.floor(Math.random() * products.length)];

        let prod = await Products.find({})
        prod  = prod[Math.floor(Math.random() * prod.length)];
        user.currentHint = hint;
        await user.save();
        user = await User.findById(req.user._id).select(['-password','-provider']);
        res.status(200).json({
            message: 'Added Successfully',
            data: {
                user: user,
                hint: hint,
                productId:product._id,
                universalProduct: prod
            },
            success: true,
        });
        
    } catch (error) {
        res.status(500).json({
            error: err.message,
            message: 'Something went wrong',
            success: false,
        });
    }
}