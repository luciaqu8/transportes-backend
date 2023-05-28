var express = require('express');
var router = express.Router();

var novedadesModel = require('../../models/novedadesModel')

/* GET home page. */
router.get('/', async function(req, res, next) {
  var novedades = await novedadesModel.getNovedades();
  res.render('admin/novedades', { layout: 'admin/layout', usuario: req.session.nombre, novedades });
});

/* La vista de agregar */
router.get('/agregar', function(req, res, next) {
  res.render('admin/agregar', { layout: 'admin/layout'});
});

/* Agregar */
router.post('/agregar', async (req, res, next) => {
  try {
    if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
      await novedadesModel.insertNovedad(req.body);
      res.redirect('/admin/novedades')
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son requeridos'
      })
    }
    
  } catch (error) {
    console.log(error)
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true, 
      message: 'No se cargo la novedad'
    })
  }
})

/* Eliminar */
router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;
  await novedadesModel.deleteNovedadId(id);
  res.redirect('/admin/novedades');
})

/* Editar */
router.get('/editar/:id', async (req, res, next) => {

  var id = req.params.id;
  var novedad = await novedadesModel.getNovedadId(id);

  res.render('admin/editar', {
    layout: 'admin/layout',
    novedad
  })
})

router.post('/editar', async (req, res, next) => {
  try {
    let obj = {
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo
    }

    let id = req.body.id

    console.log(obj)

    await novedadesModel.editarNovedadId(obj, id);
    res.redirect('/admin/novedades');

  } catch (error) {
    console.log(error)
    res.render('admin/editar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se modificó la novedad'
    })
  }
})

module.exports = router;
