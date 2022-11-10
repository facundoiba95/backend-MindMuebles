const express = require('express')
const bodyParser = require("body-parser");
const app = express() 
const nodemailer = require('nodemailer')

const bp = bodyParser;
app.use(bp.json())

const cors = require('cors')
app.use(cors())

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'mindmueblesok@gmail.com',
        pass:'lkfyrbtnjlpginoe'
    }
})

app.get('/',(req,res)=> {
    res.send('la pagina cargo correctamente')
})

app.post('/sendEmail',(req,res)=> {
    const producto = req.body;
   
    const nombreCliente = producto.nombreValue;
    const emailCliente = producto.emailValue;
    const localidadCliente = producto.localidadValue;
    const consultaCliente = producto.textareaValue;
    const celularCliente = producto.celularValue;

    const idProducto = producto.producto.id;
    const nombreProducto = producto.producto.nombre;
    const categoriaProducto = producto.producto.categoria;
    const imagenProducto = producto.producto.imagen;

    const mailOptions = {
        from: producto.emailValue,
        to:'mindmueblesok@gmail.com',
        subject:'consulta de producto',
        html: `Datos del cliente:<br/>
        Nombre: ${nombreCliente},<br/>
        eMail: ${emailCliente},<br/>
        Numero de telefono: ${celularCliente}<br/>
        Localidad: ${localidadCliente}.<br/>
        Consulta: "${consultaCliente}".<br/><br/>
        Ha consultado por el producto:<br/>
        Producto: "${nombreProducto}",<br/>
        id: "${idProducto}",<br/>
        Categoria: "${categoriaProducto}"<br/>
        <img src="${imagenProducto}" alt="imagen de producto" width=500px heigth=300px> `
    }

    transporter.sendMail(mailOptions,(error,info)=> {
        if(error){
            {console.log(error)
            res.status()}
        } else {
            console.log('Email enviado', info.response)
            res.status(200).send('Email enviado!')
        }
    })
    
})

app.post('/sendEmailContacto', (req,res) => {
    const consulta = req.body;
console.log(consulta)
})



const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO,()=> {
    console.log('El servidor esta escuchando en el puerto:' + PUERTO)
})