const express = require('express');
const PORT = 3000;
const listViewRouter = require('./list_view_router');
const editViewRouter = require('./list_edit_router');

//body-parser: Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use('/list', listViewRouter);
app.use('/edit', editViewRouter);


app.listen(PORT, () => {
  console.log(`Servidor de tareas iniciado en http://localhost:${PORT}`);
});
