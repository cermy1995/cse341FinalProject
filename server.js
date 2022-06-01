const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connection');
// const passport = require('passport')
// const session = require('express-session')


const port = process.env.PORT || 8080;
const app = express();

// //passport config
// require('./passport')(passport)

// //express -session middleware
// app.use(session({
//   secret: 'whatever i want',
//   resave: false,
//   saveUninitialized: false
// }))

// //passport middleware
// app.use(passport.initialize())
// app.use(passport.session())

app
  .use(bodyParser.json())
  .use((req, res, next) => {
      //Access-Control-Allow-Origin, * allows requests without credentials, from any origin.
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));


mongodb.initDb((err, mongodb) => {
    if(err){
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to MongoDB and listening on ${port}`);
    }
});