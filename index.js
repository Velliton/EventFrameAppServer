'use strict';
const express = require('express');
const sql = require('mssql');
const app = express();
const PORT = process.env.PORT || 3001;
var bodyParser = require('body-parser');
const { response } = require('express');
const res = require('express/lib/response');

/* слушаем порт */

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

/* параметры подключения к БД */

const dbConfig = {
    server: 'DESKTOP-RNMKHCT',
    database: 'EVENTFRAME',
    user:'Admin',
    password:'123',
        options: {
        trustedConnection: true,
        trustServerCertificate: true, 
    },
};

/* подключение к БД */

sql.connect(dbConfig, err => {
    if (err) {
    console.error('Ошибка подключения к БД:', err);
    return;
    }
    console.log('Успешное подключение к БД');
});

/* переменные для входных параметров  */

let insVal1;
let insVal2;
let insVal3;

/* получение параметров от клиента */

app.use(bodyParser.json());

/* app.get('/someval',(req,res)=>{

  }) */

app.post('/someval',(req8,res8)=>{
    insVal1 = req8.body.lotParam1;
    insVal2=req8.body.startDateParam;
    insVal3=req8.body.endDateParam;
    console.log(insVal1);
    console.log(insVal2);
    console.log(insVal3);
    res8.send(req8.body);
})




/* формирования ответа клиенту */

app.get('/api', (req, res) => {
    console.log(req);

        
        const query =`exec ShowValues_Proc @FrameName ='${insVal1}', @ProduceDateBegin = '${insVal2}', @ProduceDateEnd = '${insVal3}'`;
        sql.query(query, (err, result) => {
        if (err) {
            console.error('Ошибка выполнения запроса:', err);
            res.status(500).send('Ошибка сервера');
            return;
        }
        res.json(result.recordset);

        }); 
        
});

app.get('/frames', (req1, res1) => {

const query1 =`exec List_FrameNameValue`;
sql.query(query1, (err1, result1) => {
if (err1) {
        console.error('Ошибка выполнения запроса:', err1);
            res1.status(500).send('Ошибка сервера');
            return;
        }
        res1.json(result1.recordset);
        }); 
});