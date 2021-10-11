const express = require('express');

const servidor = express();

servidor.get('/api', (req, res) =>{
    res.send('CAMPINHO DIGITAL3!')
});

servidor.listen(3000)