const {Router} = require('express');
const mysqlConnection = require('../database');
const router = Router();

router.get('/api/esculturas', (req, res) => {
    mysqlConnection.query('SELECT * FROM viewescultura ORDER BY titulo', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/esc', (req, res) => {
    mysqlConnection.query('SELECT * FROM viewescultura', (err, rows, fields) => {
        if(!err){

            const esculturas = rows;
            console.log(rows);
            res.render('index', { esculturas });

        }else{
            console.log(err);
        }
    });
});

router.get('/uploadesc', (req, res) => {
    res.render('uploadEsc');
});

router.post('/uploadesc', (req, res) => {

    const titulo = req.body.titulo;
    const descripcion = req.body.descripcion;
    const fecha = req.body.fecha;
    const dirImagen = 'img/uploads/' + req.files['image'][0]['filename'];
    const dirVideo = 'img/uploads/' + req.files['video'][0]['filename'];
    const idQuiz = req.body.idQuiz;
    const idAutor = req.body.idAutor;
    const idTecnica = req.body.idTecnica;

    var sql = `INSERT INTO escultura (idEscultura, titulo, descripcion, fecha, dirImagen, dirVideo, idQuiz, idAutor, idTecnica) VALUES (NULL, "${titulo}", "${descripcion}", "${fecha}", "${dirImagen}", "${dirVideo}", "${idQuiz}", "${idAutor}", "${idTecnica}")`;

    mysqlConnection.query(sql, function(err, result) {
        if(err) throw err;

        console.log('archivo insertado');
        res.redirect('/uploadesc');
    });

});

module.exports =  router;