const express = require('express');
const cors = require('cors');

require('dotenv').config();


//in future, if need database/ports, need to require dotenv and integrate process.env file

const app = express();
const port = process.env.port || 5000;


app.use(cors());
app.use(express.json);

//connect mongoose uri here using:

/*
 const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
    );

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
*/

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});