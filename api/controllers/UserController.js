/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  /**
   * Sign in for a user account.
   */

   login: function(req, res) {

    User.findOne({
      email: req.param('email')
    }, function foundUser(err, user){
      if (err) return res.negotiate(err);
      if(!user) return res.notFound();

      require('machinepack-passwords').checkPassword({
        passwordAttempt : req.param('password'),
        encryptedPassword: user.encryptedPassword
      }).exec({
        error: function(err) {
          return res.negotiate(err);
        },

        incorrect: function(err) {
          return res.notFound();
        },

        success: function() {
          req.session.me = user.id;
          return res.ok();
        }
      });
    });
   },

  /**
   * Sign up for a user account.
   */
  signup: function(req, res) {

    var Passwords = require('machinepack-passwords');

    // Encrypt a string using the BCrypt algorithm.
    Passwords.encryptPassword({
      password: req.param('password'),
      difficulty: 10,
    }).exec({
      // An unexpected error occurred.
      error: function(err) {
        return res.negotiate(err);
      },
      // OK.
      success: function(encryptedPassword) {
        require('machinepack-gravatar').getImageUrl({
          emailAddress: req.param('email')
        }).exec({
          error: function(err) {
            return res.negotiate(err);
          },
          success: function(gravatarUrl) {
          // Create a User with the params sent from
          // the sign-up form --> signup.ejs
            User.create({
              name: req.param('name'),
              title: req.param('title'),
              email: req.param('email'),
              encryptedPassword: encryptedPassword,
              lastLoggedIn: new Date(),
              gravatarUrl: gravatarUrl
            }, function userCreated(err, newUser) {
              if (err) {

                console.log("err: ", err);
                console.log("err.invalidAttributes: ", err.invalidAttributes)

                // If this is a uniqueness error about the email attribute,
                // send back an easily parseable status code.
                if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0]
                  && err.invalidAttributes.email[0].rule === 'unique') {
                  return res.emailAddressInUse();
                }

                // Otherwise, send back something reasonable as our error response.
                return res.negotiate(err);
              }

              // Send back the id of the new user
              return res.json({
                id: newUser.id
              });
            });
          }
        });
      }
    });
  },

  connectTwitter: function(req, res, next){
    var Twitter = require('machinepack-twitter');
    Twitter.getLoginUrl({
      consumerKey: '',
      consumerSecret: '',
      callbackUrl: '',
    }).exec({
    // An unexpected error occurred.
      error: function (err){
       return next(err);
      },
      // OK.
      success: function (result){
       
      },
    });
  },

  connectFacebook: function(req, res, next){
    var Facebook = require('machinepack-facebook');
    Facebook.getLoginUrl({
      appId: '',
      callbackUrl: '',
      permissions: ['']
    }).exec({
    // An unexpected error occurred.
      error: function (err){
       return next(err);
      },
      // OK.
      success: function (result){
       
      },
    });
  }
};
