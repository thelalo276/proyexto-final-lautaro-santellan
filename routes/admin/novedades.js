var express = require('express')
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');

/* GET home page. */
router.get('/', async function (req, res, next) {

  var novedades = await novedadesModel.getNovedades();

  res.render('admin/novedades', {
    layout:'admin/layout',
    usuario: req.session.nombre,
    novedades
  });
});

router.get('/eliminar/:id', async ( req, res, next) =>{
  var id = req.params.id;
  await novedadesModel.deleteNovedadesById(id);
  res.redirect('/admin/novedades')
});

router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar' , {
    layout: 'admin/layout'
  })
});

// agregar

router.post('/agregar', async (req, res, next) => {
 try{
    if (req.body.titulo !="" && req.body.subtitulo !="" && req.body.cuerpo !="")  {
      await novedadesModel.insertNovedad(req.body);
      res.redirect('/admin/novedades')
    } else {
      res.render('admin/agregar' , {
        layout: 'admin/layout',
        error:true,
        message: 'todos los campos son requeridos'
      })
    }
  } catch (error) {
    console.log(error)
    res.render('admin/agregar' , {
        layout: 'admin/layout' ,
      error:true,
      message: 'no se cargo la novedad'
    })
  }
});

module.exports = router;