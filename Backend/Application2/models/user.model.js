const mongoose =require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
         trim: true
    },
    mobile:{
        type:String,
        required:true
    },
   
}, {
    timestamps: true
});


// export default mongoose.model('User', userSchema)
module.exports = mongoose.model("user", userSchema, "USER");