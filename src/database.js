const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'appmunalbd.cfgtrz67kkmk.us-west-1.rds.amazonaws.com',
    user: 'admin',
    password: 'appmunalbd',
    database: 'appmunalbd'

});

mysqlConnection.connect(function (err) {
    if(err){
        console.log(err);
        return;
    }else{
        console.log('DB is connected');
    }
});

module.exports = mysqlConnection; 