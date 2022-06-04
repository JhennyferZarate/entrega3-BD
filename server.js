const express = require('express')
const Contenedor = require('./contenedor');
const app = express()
const PORT = 8080

const server = app.listen(PORT, () => {
	console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`));

const contenedor = new Contenedor("productos.txt");

app.get('/productos', async (req, res) => {
	const productos1 = await contenedor.getAll()
    res.send(productos1)  
})

app.get('/productoRandom', async (req, res) => {
	const productos2 = await contenedor.getAll()
    const random = Math.floor(Math.random() * productos2.length)
    res.send(productos2[random])  
})