const express = require('express');
const app = express();
const findindb=require('./books');
const saveInDB=require('./users');

app.use(express.json()); 


app.get('/',(req,resp)=>{
    resp.send(saveInDB)
    
})

app.put('/',(req,resp)=>{
    resp.send(saveInDB)
})
app.listen(5000);