var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose =require('mongoose');
var expressValidator=require('express-validator');
const chatController=require('./controller/chatcontroller')
const dbConfig = require('./config/config')
mongoose.set('useCreateIndex', true);//deprecation warning hiding
mongoose.set('useUnifiedTopology', true);
const socketIO = require('socket.io');
var router = require('./routes/routes');


app.use(express.static('../FrontEnd')) //front end connection 

app.use(expressValidator());

app.use(bodyParser.json());

app.use('/', router);


mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(()=>{
    console.log("Database Sucessfully Connected.......");
}).catch(err => {
    console.log('Failed to connect to database........');
    process.exit();
});

 const server=app.listen(3000, ()=> {
    console.log("Server is running on Port: ");
});

let io=socketIO(server);

io.on("connection",function(socket){
    console.log('socket connected');
    socket.on('messageContainer',(message)=>{
        console.log(message.senderID)
        io.emit(String(message.receiverID),message);
               
        let sendMsgCtrlPromise=chatController.sendMessageCtrl(message);
        sendMsgCtrlPromise.then(function(data){
            console.log("mydata ",message)
        }).catch(function(err){
            return  err;
        });
    })
    
    socket.on("disconnect",()=>{
        console.log('socket disconnected');
    })
})