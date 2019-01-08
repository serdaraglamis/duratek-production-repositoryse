const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');

const Router = require('express').Router;
const router = new Router();
// const sharp = require('./sharp/lib');

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

const nodemailer = require('nodemailer');
const mime = require('mime');
const multer = require('multer');
const crypto = require('crypto');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, __dirname + '/public/uploads/')
  },
  filename: function(req, file, cb) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      const types = file.originalname;
      const typesParsed = types.split('.');
      // cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimeType));
      cb(null, raw.toString('hex') + Date.now() + '.' + typesParsed[1]);
    });
  }
});
const upload = multer({
  storage: storage
});

router.post('/api/upload', upload.single("image"), function(req, res) {
/*  sharp(req.file.path)
    .rotate()
    .resize(300, 300)
    .toFile(__dirname + '/public/uploads/' + 'resized/' + req.file.filename)
    .then( data => res.json({
      "status":"success",
      "name":"uid_filename.jpg",
      "path": 'cdn/' + req.file.filename,
      "resized": 'cdn/resized/' + req.file.filename,
    })).catch((e) => res.status(500).send('Something broke!'));*/
  res.json({
    "status":"success",
    "name":"uid_filename.jpg",
    "path": 'cdn/' + req.file.filename,
    "resized": 'cdn/resized/' + req.file.filename,
  })
});


router.post('/api/uploadgallery', upload.single("image"), function(req, res) {
  /*  sharp(req.file.path)
      .rotate()
      .resize(300, 300)
      .toFile(__dirname + '/public/uploads/' + 'resized/' + req.file.filename)
      .then( data => res.json({
        "status":"success",
        "name":"uid_filename.jpg",
        "path": 'cdn/' + req.file.filename,
        "resized": 'cdn/resized/' + req.file.filename,
      })).catch((e) => res.status(500).send('Something broke!'));*/
  res.json({
    "status":"success",
    "name":"uid_filename.jpg",
    "path": 'cdn/' + req.file.filename,
    "resized": 'cdn/resized/' + req.file.filename,
  })
});

router.post('/api/sendmail', function (req, res) {
  console.log('REQUEST GELDİ', req.body);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mezreveserdar@gmail.com',
      pass: ''
    }
  });

  if(req.body.source === 'product') {
    readHTMLFile(__dirname + '/urun-bilgi-talebi-success.html', function(err, html) {
      var template = handlebars.compile(html);
      var replacements = {
        categoryname: req.body.currentCategory.languages.tr.title
      };
      var htmlToSend = template(replacements);
      var mailOptions = {
        from: 'mezreveserdar@gmail.com',
        to: req.body.email,
        subject: 'Ürün Talep Bilgisi',
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
  }

  if(req.body.source === 'contact') {

  }
/*  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mezreveserdar@gmail.com',
      pass: 'Dila2323Elazig'
    }
  });

  var mailOptions = {
    from: 'mezreveserdar@gmail.com',
    to: 'serdaraglamis@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Gönderildi');
    }
  });*/

  res.send({status: 'success'})
});

// Loads dynamically all endpoints within models directory
const dirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory())
dirs('./model').map((endpoint) => {
  router.use(`/api/${endpoint}`, require(`./model/${endpoint}/router`));
})

const ENDPOINT = require('./model/datasource-news/router');
    router.use('/api/datasource/news', ENDPOINT);

const ENDPOINT2 = require('./model/datasource-projects/router');
router.use('/api/datasource/projects', ENDPOINT2);

const ENDPOINT3 = require('./model/datasource-menu/router');
router.use('/api/datasource/menu', ENDPOINT3);

const ENDPOINT4 = require('./model/datasource-events/router');
router.use('/api/datasource/events', ENDPOINT4);

const ENDPOINT5 = require('./model/datasource-locations/router');
router.use('/api/datasource/locations', ENDPOINT5);


/*

  To load endpoints manually you can follow the example bellow

    const ENDPOINT = require('./model/ENDPOINT/router');
    router.use('/api/ENDPOINT', ENDPOINT);

*/
router.get('/_admin', function(req, res) {
  res.sendfile(path.resolve('admin-files/www/index.html'));
});

router.get('*', function(req, res) {
  res.sendfile(path.resolve('www/index.html'));
});

module.exports = router;
