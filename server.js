const express = require('express');
const job=require('./routes/job.js');
const users = require('./routes/user.js');
const cors = require('cors')
const mongoose = require('mongoose');
const path = require('path');

const cookieParser = require('cookie-parser');
const session = require('express-session')
const MongoStore = require('connect-mongo');

//Setup MongoDB Connection
//mongoose.connect('mongodb://127.0.0.1/pokemon_app', { useNewUrlParser: true })

const  mongoAtlasUri =
        "mongodb+srv://19961017zqh:19961017zqh@cluster0.louun.mongodb.net/demo?retryWrites=true&w=majority";
        mongoose.connect(mongoAtlasUri, { useNewUrlParser: true })
        

        const mongoDB = mongoose.connection;

mongoDB.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

const app = express();

// app.use(session({secret: "SUPER_DUPER_SECRET",
//     store: MongoStore.create({ mongoUrl: mongoString }),
// }));

app.use(session({secret: "SUPER_SECRET",
    store: MongoStore.create({ mongoUrl: mongoAtlasUri }),
}));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/job', job); 

app.use('/api/users', users);


app.get('/', (req, res) => {
    res.send('test!');
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
    // res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(8000, function() {
    console.log('Starting server');
});

