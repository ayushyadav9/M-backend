const Products = require("../../models/Product");

module.exports.addProduct = async(req,res)=>{
    try {
        let prod = new Products({
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            category: req.body.description,
            image: req.body.image,
            rating:{
                rate:req.body.rate,
                count:req.body.count
            }
        });
        await prod.save();

        res.status(200).json({
            message: 'Added Successfully',
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

module.exports.getProducts = async(req,res)=>{
    try {
        let gender = req.query.gender
        let categ = req.query.category
        if(categ){
            let prods = await Products.find({category:categ})
            res.status(200).json({
                message: 'Category Products found',
                data: prods,
                success: true
            });
        }
        else if(gender){
            let prods = await Products.find({gender:gender})
            res.status(200).json({
                message: 'Gender Products found',
                data: prods,
                success: true
            });
        }
        else{
            let prod = await Products.find({});
            res.status(200).json({
                message: 'Products fetched',
                data: prod,
                success: true
            });
        }
        
        
    } catch (err) {
        res.status(500).json({
            error: err.message,
            message: 'Something went wrong',
            success: false,
        });
    }
}

module.exports.getProduct = async(req,res)=>{
    try {
        let prod = await Products.findById(req.params.id)
        if(!prod){
            return res.status(400).json({
                message: 'No product found',
                success: false,
            });
        }

        res.status(200).json({
            message: 'Product found',
            data: prod,
            success: true
        });


    } catch (err) {
        res.status(500).json({
            error: err.message,
            message: 'Something went wrong',
            success: false,
        });
    }
}

