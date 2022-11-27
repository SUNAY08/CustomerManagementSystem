const express = require("express")
const app = express();
require("./db/connection");
const customerRouter = require("./routes/customer");

const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./apidocs/swagger.json');

app.use('/apiDocs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())

app.use('/api/customer', customerRouter)


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("server is running at port ", port);
})



