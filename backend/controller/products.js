const product = require('../model/product')
exports.getproducts = (req, res) => {
    product.find().then((result) => {
        const params = req.params.gender
console.log(params)
        // console.log(result)
        // console.log(result)
        const products = result.filter((p) => p.gender === params)
        // console.log(products)
        res.json(products)
    })

    
    
}
exports.getoneproduct = async (req, res) => {
    const params = req.params 

    try {
        const oneproduct = await product.findById(params.productid)
        res.json(oneproduct)
    } catch (err){
        if (err) {
            // console.log(err)
            res.status(409).json("product doesn't exists")
            
        }
    }
    
    
} 