const http=require("http");
const express=require('express')
const app=express();
const cors=require('cors')
const ConnectDatabas=require('./db.js')
const port=3000;

ConnectDatabas();

 const server=http.createServer(app);
app.use(express.json())
app.use(cors())
app.use(cors({
   origin:["https://react-home-w1fx.vercel.app"],
   methods:['POST','GET'],
   Credentials:true
}
   ))
 app.use('/api/auth',require('./routes/auth.js'))


app.use('/',(req,res)=>{

res.json({name:"Awais Malilk",roll_no:19497})

}

)
server.listen(port,()=>{
console.log(`server ready port 3000`);

})




