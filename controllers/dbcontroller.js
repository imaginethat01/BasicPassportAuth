const mongoose = require('mongoose');

// get reference to database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("Connection Successful!");
    
    // define Schema
    const Schema = mongoose.Schema;
    const UserDetail = new Schema({
          username: String,
          password: String
        });
 
    // compile schema to model
    const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

    
    // a document instance
    const userAdd = new UserDetails({ username: 'newuser', password: 'newpassw' });


    // save model to database
    userAdd.save(function (err, user) {
      if (err) return console.error(err);
      console.log(user.username + " added to db");
    });


  

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
    cb(err, user);
  });
});


passport.use(new LocalStrategy(
  function(username, password, done) {
      UserDetails.findOne({
        username: username
      }, function(err, user) {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false);
        }

        if (user.password != password) {
          return done(null, false);
        }
        return done(null, user);
      });
  }

));

});