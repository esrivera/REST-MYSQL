const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Bienvenido');
});
app.use('/estadio', require('./routes/estadio'));

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));