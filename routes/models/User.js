const { Schema, default: mongoose } = require("mongoose")

const User=new Schema ({
name:{
type:String,
required:true

}
,
email:{
type:String,
required:true,
unique:true
},
password:{
type:String,
required:true

},
file:{
    type:String
},

date:{
type:Date,
default: Date.now

}

})
 module.exports=mongoose.model('user',User)