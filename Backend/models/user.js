const mongoose =require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
         trim: true
    },
    mobile:{
        type:String
    },
   
}, {
    timestamps: true
});


// export default mongoose.model('User', userSchema)
module.exports = mongoose.model("user", userSchema, "USER");