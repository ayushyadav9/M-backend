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
        let prod = await Products.find({});
        let data = [];
        prod.forEach(element => {
            data.push({
                id: element._id,
                title: element.title,
                price: element.price,
                description: element.description,
                category: element.category,
                image: element.image,
                rating: element.rating
            });
        });

        res.status(200).json({
            message: 'Products fetched',
            data: data,
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