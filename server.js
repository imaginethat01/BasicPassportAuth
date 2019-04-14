/*  EXPRESS SETUP  */

const passport = require('passport');
const express = require('express');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 8080;


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => res.sendFile('./public/auth.html', { root : __dirname}));


require('./config/connection');
require('./controllers/dbcontroller');



/*  PASSPORT SETUP  */
app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send("Welcome "+req.query.username+"!!"));
app.get('/error', (req, res) => res.send("error logging in"));


app.post('/',
  passport.authenticate('local', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/success?username='+req.user.username);
  });

app.listen(port , () => console.log('App listening on port ' + port));

