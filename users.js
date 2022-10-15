const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/lib_hackn';

const cred = require('./register.html')

mongoose.connect(url);
const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        require : true
    },
    mobile:{
        type:Number,
        require : true
    },
    email:{
        type:String,
        require : true
    },
    address:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
});

const saveInDB = async () => {
    const Users = mongoose.model('users', ProductSchema);
    let data = new Users(cred);
    const result = await data.save();
    console.log(result);
}

saveInDB();

module.exports={saveInDB}
