const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/lib_hackn';

mongoose.connect(url);
const ProductSchema = new mongoose.Schema({
    name:String,
    author:String,
    category:String,
    price:Number,
    rating:Number
});


const findindb = async()=>{
    const Product= mongoose.model('Books',ProductSchema);
    let data = await Product.find({});
   
    console.log(data)
}


const saveInDB = async () => {
    const Product = mongoose.model('books', productSchema);
    let data = new Product({
        
    });
    const result = await data.save();
    console.log(result);
}

const updateInDB =async  () => {
    const Product = mongoose.model('books', productSchema);
    let data =await  Product.updateOne(
       
    )
    console.log(data)
}

findindb();



module.exports={findindb,saveInDB,findindb,updateInDB};