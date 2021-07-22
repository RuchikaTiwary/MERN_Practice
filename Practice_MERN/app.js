const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser);
app.use((req,res,next)=>{
    console.log('Listening server!!!');
})

app.listen(1000);
