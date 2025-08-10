const mongoose = require('mongoose');

const connectDB = (url) => {
    
    mongoose.set('strictQuery',true);      // mongoose will throw error if query

    mongoose.connect(url)
        .then(()=>console.log("MongoDB Connected..."))
        .catch((error)=>console.error(error));
}
module.exports=connectDB; 