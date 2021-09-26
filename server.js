const express = require("express");
const cors = require("cors");
// requiring db config
require("./config/dbSetting")
const morgan = require("morgan")
const medicineRoute = require("./routes/medicineRoute")

let app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('tiny'))

app.use(medicineRoute);



const port = 8080 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening at port: ${port}`);
});
