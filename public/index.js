const socket = io();

//Conecta con el socket.emit para enviar el alert de bienvenida
socket.on('welcome', data=>{
    alert(data)
})

let input = document.getElementById('mensaje')
let user = document.getElementById('user')
input.addEventListener('keyup',(e)=>{
    if(e.key==="Enter"){
        socket.emit('message',{user:user.value,message:e.target.value})
    }
})

socket.on('messageLog',data=>{
    let p = document.getElementById('log');
    let mensajes = data.map(message=>{
        return `<div><span>${message.user} dice: ${message.message}</span></div>`
    }).join('')
    p.innerHTML=mensajes;
})