const express = require('express');
const multer = require('multer');
const app = express();
const path = require('path');

//Configuración
var port = process.env.PORT || 3000;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

app.use(multer({storage: storage}).fields([{name: 'image'}, {name: 'video'}]))


/*
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    destination: path.join(__dirname, 'public/img/uploads')
});
app.use(multer({ storage: storage }).single('image'));
*/

app.use(express.static(path.join(__dirname, 'public')));

//Rutas
app.use(require('./rutas/termino'));
app.use(require('./rutas/imagenes'));
app.use(require('./rutas/esculturas'));

//Configuración del servidor

app.listen(port, () => {
    console.log('Server in port', (port));
});