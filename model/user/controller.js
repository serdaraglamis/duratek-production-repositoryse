const Controller = require('../../lib/controller');
const userFacade = require('./facade');
const passport = require('passport');
const userSchema = require('./schema');
const fs = require('fs');

const handlebars = require('handlebars');
const nodemailer = require('nodemailer');
var readHTMLFile = function(path, callback) {
  fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
    if (err) {
      throw err;
      callback(err);
    }
    else {
      callback(null, html);
    }
  });
};

class UserController extends Controller {

  // Returns Session if Logged-in
  getSession(req, res, next) {
    res.json(req.user);
  }

  // Logout
  logout(req, res, next) {
    req.logout();
    res.redirect('/login');
  }




  // Login

  registerPassword(req, res, next) {

    console.log('Login Password Arrived')
    userSchema.register(new userSchema({ username : req.body.username }), req.body.password, function(err, account) {
      if (err) {
        return res.render('register', { account : account });
      }

      passport.authenticate('local')(req, res, function () {
        res.redirect('/');
      });
    });

  }

  createUser(req, res, next) {

    const mockpassword = Math.random().toString(36).slice(-8);

    userSchema.register(new userSchema({ username : req.body.username }), mockpassword, function(err, account) {
      if (err) {
        console.log('ABO', err)
        return res.render('register', { account : account });
      }

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'mezreveserdar@gmail.com',
          pass: 'Dila2323Elazig'
        }
      });

      readHTMLFile(__dirname + '/kullanici-olustur.html', function(err, html) {
        console.log('ERRR', err)
        var template = handlebars.compile(html);
        var replacements = {
          creator: req.body.creator,
          password: mockpassword
        };
        var htmlToSend = template(replacements);
        var mailOptions = {
          from: 'mezreveserdar@gmail.com',
          to: req.body.username,
          subject: 'Anamorfix | Yeni Kullanıcı Kaydı',
          html : htmlToSend
        };
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
            res.send('Gönderildi');
          }
        })
      });
    });
  }

  forgetPassword(req, res, next) {

    const mockpassword = Math.random().toString(36).slice(-8);

    userSchema.findByUsername(req.body.username).then(function(sanitizedUser){
      if (sanitizedUser){
        sanitizedUser.setPassword(mockpassword, function(){
          sanitizedUser.save();
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'mezreveserdar@gmail.com',
              pass: 'Dila2323Elazig'
            }
          });

          readHTMLFile(__dirname + '/sifre-degistirildi.html', function(err, html) {
            console.log('ERRR', err)
            var template = handlebars.compile(html);
            var replacements = {
              password: mockpassword
            };
            var htmlToSend = template(replacements);
            var mailOptions = {
              from: 'mezreveserdar@gmail.com',
              to: req.body.username,
              subject: 'Anamorfix | Şifremi Sıfırlama',
              html : htmlToSend
            };
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
                res.send('Gönderildi');
              }
            })
          });
        });
      } else {
        res.status(500).json({message: 'This user does not exist'});
      }
    },function(err){
      console.error(err);
    })
  }

  changePassword(req, res, next) {
    userSchema.findByUsername(req.body.username).then(function(sanitizedUser){
      if (sanitizedUser){
        sanitizedUser.setPassword(req.body.password, function(){
          sanitizedUser.save();
          res.status(200).json({message: 'password reset successful'});
        });
      } else {
        res.status(500).json({message: 'This user does not exist'});
      }
    },function(err){
      console.error(err);
    })
  }


  loginPassword(req, res, next) {
    passport.authenticate('local')(req, res, function () {
      res.send(req.user)
    });
  }
  // Facebook

  authenticateFacebook(req, res, next) {
    passport.authenticate('facebook', {
      scope: ['public_profile', 'email']
    })(req, res, next);
  }

  authorizeFacebook(req, res, next) {
    passport.authorize('facebook', {
      scope: ['public_profile', 'email']
    })(req, res, next);
  }

  callbackAuthFacebook(req, res, next) {
    passport.authenticate('facebook', function(err, data) {
      if (err)
        return next(err);
      req.login(data, function(err) {
        if (err)
          return next(err);
        return res.redirect('/profile');
      });
    })(req, res, next);
  }

  callbackAuthzFacebook(req, res, next) {
    passport.authorize('facebook', function(err, data) {
      if (err)
        return next(err);
      if (data)
        req.session.user = data
      res.redirect('/profile')
    })(req, res, next);
  }

  unlinkFacebook(req, res, next) {
    this.facade.update({
        _id: req.user._id
      }, {
        $unset: {
          facebook: 1
        }
      })
      .then((results) => {
        delete req.user.facebook
        res.redirect('/profile');
      })
      .catch(err => next(err));
  }

  // Twitter

  authenticateTwitter(req, res, next) {
    passport.authenticate('twitter')(req, res, next);
  }

  authorizeTwitter(req, res, next) {
    passport.authorize('twitter')(req, res, next);
  }

  callbackAuthTwitter(req, res, next) {
    passport.authenticate('twitter', function(err, data) {
      if (err)
        return next(err);
      req.login(data, function(err) {
        if (err)
          return next(err);
        return res.redirect('/profile');
      });
    })(req, res, next);
  }

  callbackAuthzTwitter(req, res, next) {
    passport.authorize('twitter', function(err, data) {
      if (err)
        return next(err);
      if (data)
        req.session.user = data
      res.redirect('/profile')
    })(req, res, next);
  }

  unlinkTwitter(req, res, next) {
    this.facade.update({
        _id: req.user._id
      }, {
        $unset: {
          twitter: 1
        }
      })
      .then((results) => {
        delete req.user.twitter
        res.redirect('/profile');
      })
      .catch(err => next(err));
  }

  // Google

  authenticateGoogle(req, res, next) {
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })(req, res, next);
  }

  authorizeGoogle(req, res, next) {
    passport.authorize('google', {
      scope: ['profile', 'email']
    })(req, res, next);
  }

  callbackAuthGoogle(req, res, next) {
    passport.authenticate('google', function(err, data) {
      if (err)
        return next(err);
      req.login(data, function(err) {
        if (err)
          return next(err);
        return res.redirect('/profile');
      });
    })(req, res, next);
  }

  callbackAuthzGoogle(req, res, next) {
    passport.authorize('google', function(err, data) {
      if (err)
        return next(err);
      if (data)
        req.session.user = data
      res.redirect('/profile')
    })(req, res, next);
  }

  unlinkGoogle(req, res, next) {
    this.facade.update({
        _id: req.user._id
      }, {
        $unset: {
          google: 1
        }
      })
      .then((results) => {
        delete req.user.google
        res.redirect('/profile');
      })
      .catch(err => next(err));
  }

  // Github

  authenticateGithub(req, res, next) {
    passport.authenticate('github')(req, res, next);
  }

  authorizeGithub(req, res, next) {
    passport.authorize('github')(req, res, next);
  }

  callbackAuthGithub(req, res, next) {
    passport.authenticate('github', function(err, data) {
      if (err)
        return next(err);
      req.login(data, function(err) {
        if (err)
          return next(err);
        return res.redirect('/profile');
      });
    })(req, res, next);
  }

  callbackAuthzGithub(req, res, next) {
    passport.authorize('github', function(err, data) {
      if (err)
        return next(err);
      res.redirect('/profile')
    })(req, res, next);
  }

  unlinkGithub(req, res, next) {
    this.facade.update({
        _id: req.user._id
      }, {
        $unset: {
          github: 1
        }
      })
      .then((results) => {
        delete req.user.github
        res.redirect('/profile');
      })
      .catch(err => next(err));
  }

}

module.exports = new UserController(userFacade);
