var express = require('express');
var router = express.Router();
var novedadesModel = require('./../models/novedadesModel');
var cloudinary = require('cloudinary').v2;
var nodemailer = require('nodemailer');


router.get('/novedades', async function (req, res, next) {
    let novedades = await novedadesModel.getNovedades();

    novedades = novedades.map(novedades => {
        if (novedades.img_id) {
            const imagen = cloudinary.url(novedades.img_id, {
                width: 960,
                height: 200,
                crop: 'fill'
            });
            return {
                ...novedades,
                imagen
            }
        } else {
            return {
                ...novedades, 
                imagen:''
            }
        }
    });

    res.json(novedades);
});

router.post('/contacto', async (req, res) => {

    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "585a9131d19479",
          pass: "0e94ff09871b67"
        }
      });

    const mail = {
        to: 'luciaquinteiro8396@gmail.com',
        subject: 'Contacto web',
        html: `${req.body.nombre}' se contacto a traves de la web y quiere más información a este correo: ${req.body.email} 
        <br> Además, hizo el siguiente comentario: ${req.body.mensaje}`
    }

    await transport.sendMail(mail)

    res.status(201).json({
        error: false,
        message: 'Mensaje enviado'
    });
});

module.exports = router;