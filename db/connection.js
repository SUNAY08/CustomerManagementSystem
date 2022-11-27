const mongoose = require("mongoose");
const connnectionUrl = "mongodb://localhost:27017/customer_management";
 
mongoose.connect(connnectionUrl,{
    // useNewParserUrl:true
},(err,res)=>{
    if (err){
        console.log("db not connected"+err)
    }
    else{
        console.log('db connected');
    }
})
