const {Router} = require('express');
const mysqlConnection = require('../database');
const router = Router();

router.get('/api/termino', (req, res) => {
    mysqlConnection.query('SELECT * FROM termino ORDER BY termino', (err, rows, fields) => {
        if(!err){

            res.json(rows);

        }else{
            console.log(err);
        }
    });
});

module.exports =  router;