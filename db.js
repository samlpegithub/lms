const mongoose=require('mongoose');


// mongodb+srv://awaismalik:awais@cluster0.1z4rify.mongodb.net/
const ConnectDatabase=async()=>{
let url='mongodb+srv://awaismalik:awais@cluster0.1z4rify.mongodb.net/'
    await  mongoose.connect(url)
console.log('successfully connect with database..');

}
 module.exports=ConnectDatabase