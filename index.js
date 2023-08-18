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
 app.use('/api/auth',require('./routes/auth.js'))

app.use(cors(
    {

origin:[],
methods:['POST','GET'],
Credential:true


    }
))
app.get('/',(req,res)=>{

res.json({name:"Awais Malilk"})

}

)
server.listen(port,()=>{
console.log(`server ready port 3000`);

})




