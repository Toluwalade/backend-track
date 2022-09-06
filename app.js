const express = require("express");
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');

app.use(helmet())
app.use(morgan())
app.use(bodyParser.urlencoded({
    extended: false
}));

const DB = 'mongodb://localhost:27017/Employee-Management-System';

const connectDb = async() => {

await mongoose.connect(DB, { useNewUrlParser: true })
  .then(() => {
    console.log(`Database connected successfully ${DB}`)
})
.catch(err => { 
    console.log(`Unable to connect with the database ${err}`)
});

}

connectDb();

// Json Body Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
// Setting up static directories
app.use(express.static('public'));
// Bring in the Users route
app.use(require('./routes'));

module.exports = app;

