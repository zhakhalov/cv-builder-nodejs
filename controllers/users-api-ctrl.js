var UserModel = global.__require('models/user-model.js');
var _ = require('underscore');


module.exports = function (router) {
  router
  /**
   * Remove all users from database
   */
  .get('/users/removeall', function (req, res, next) {
    UserModel.remove(function (err) {
      if (err) {
        next(err);
      } else {
        res.send({ message: 'all users removed' });
      }
    });
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
  .post('/users', function (req, res, next) {
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
  .put('/users', function (req, res, next) {
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
  });
};