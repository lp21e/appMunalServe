const {Router} = require('express');
const mysqlConnection = require('../database');
const router = Router();

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM viewPintura', (err, rows, fields) => {
        if(!err){

            const pinturas = rows;
            console.log(rows);
            res.render('index', { pinturas });

        }else{
            console.log(err);
        }
    });
});

router.get('/upload', (req, res) => {
    res.render('upload');
});

router.post('/upload', (req, res) => {

    const titulo = req.body.titulo;
    const descripcion = req.body.descripcion;
    const fecha = req.body.fecha;
    const dirImagen = 'img/uploads/' + req.files['image'][0]['filename'];
    const dirVideo = 'img/uploads/' + req.files['video'][0]['filename'];
    const idQuiz = req.body.idQuiz;
    const idAutor = req.body.idAutor;
    const idCategoria = req.body.idCategoria;
    const idTecnica = req.body.idTecnica;

    var sql = `INSERT INTO pintura (idPintura, titulo, descripcion, fecha, dirImagen, dirVideo, idQuiz, idAutor, idCategoria, idTecnica) VALUES (NULL, "${titulo}", "${descripcion}", "${fecha}", "${dirImagen}", "${dirVideo}", "${idQuiz}", "${idAutor}", "${idCategoria}", "${idTecnica}")`;

    mysqlConnection.query(sql, function(err, result) {
        if(err) throw err;

        console.log('archivo insertado');
        res.redirect('/upload');
    });

});

module.exports =  router;