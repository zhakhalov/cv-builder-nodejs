var _ = require('underscore');

var UserModel = global.__require('models/user-model.js');
var userValidator = global.__require('modules/model-validators/user-validator.js');
var security = global.__require('modules/security/security.js');

module.exports = function (router) {
  router
  /**
   * Remove all users from database *********************************** FOR DEV SERVER ONLY
   */
  .get('/users/removeall', function (req, res, next) {
    if (!process.env.DEV) {
      var err = new Error('Not available in release');
      err.status = 403;
      next(err);
    } else {
      UserModel.remove(function (err) {
        if (err) {
          next(err);
        } else {
          res.send({ message: 'all users removed' });
        }
      });  
    }
  })
  /**
   * Get all users from database
   */
  .get('/users', function (req, res, next) {
    UserModel.find().lean().exec(function (err, docs) {
      if (err) {
        next(err);
      } else {
        res.send(docs);
      }
    });
  })
  /**
   * Return user from database by id
   */
  .get('/users/:id', function (req, res, next) {
    UserModel.findById(req.params.id).lean().exec(function (err, doc) {
      if (err) {
        next(err);
      } else {
        res.send(doc);
      }
    });
  })
  /**
   * Save user to database
   */
  .post('/users', security.ensureAuthenticated, function (req, res, next) {
    var model = new UserModel(req.body);
    model.save(function (err, doc) {
      if (err) {
        next(err);
      } else {
        res.send(doc);
      }
    });
  })
  /**
   * Update user
   */
  .put('/users', security.ensureAuthenticated, function (req, res, next) {
    userValidator(req.user, req.body, function (message) {
      if (message) {
        var err = new Error(message);
        err.status = 409;
        next(err);
      } else {
        UserModel.findById(req.body._id, function (err, doc) {
          if (err) {
            next(err);
          } else if (!doc) {
            next(new Error('User ' + req.params.id + ' not found'));
          } else {
            _.each(req.body, function (value, key) { if (key in doc) { doc[key] = value; } });
            doc.save(function(err, doc) {
              if (err) {
                next(err);
              } else {
                res.send(doc.toObject());
              }
            });
          }
        });
        delete req.body._id;
      }
    });
  })
  .delete('/users', function (req, res, next) {
    UserModel.remove(req.query || {}, function (err) {
        if (err) {
          next(err);
        } else {
          res.send('removed');
        }
      });  
  });
};