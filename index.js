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

app.post('/paramsApi',(req,res)=>{
    insVal1 = req.body.lotParam1;
    insVal2=req.body.startDateParam;
    insVal3=req.body.endDateParam;
    res.send(req.body);
})




/* формирования ответа*/

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

app.get('/frames', (req, res) => {

const query1 =`exec List_FrameNameValue`;
sql.query(query1, (err, result) => {
if (err) {
        console.error('Ошибка выполнения запроса:', err);
            res.status(500).send('Ошибка сервера');
            return;
        }
        res.json(result.recordset);
        }); 
});