const express = require('express');
const {Server} = require('socket.io');
const app = express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>{
    console.log('Escuchando en 8080')
});
const io = new Server(server);
app.use(express.static(__dirname+'/public'))
let messages = []

io.on('connection', socket=>{
    //Mensaje en el servidor de cliente conectado
    console.log('cliente conectado');
    //Imprimimos los menjsanes para que puedan ser vistos apenas nos conectamos 
    socket.emit('messagelog', messages)
    //Al conectarse, envia el alert de bienvenida
    socket.emit('welcome', 'Bienvenido al socket')
    //Recibe la informacion del input
    socket.on('message', data=>{
        //Le indicamos que con la informacion del input devuela el mensaje con la info
        //con el 'io.emit' hacemos que ese mensaje se envie a todos los clientes
        messages.push(data)
        io.emit('messageLog',messages)
    })
})