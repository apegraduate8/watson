const User = require('../../models/user');
const router = require('express').Router();
const passport = require('passport');

// const controller = require('./controller');
const AuthService = require('../../services/auth');

// ----------------------------------------
// users index

router.post('/', passport.authenticate(

    'local-signup',
    {
      failureRedirect:  '/users/new',
      successRedirect: '/users/profile' ////directs us after signup
    }
  )
);

// ----------------------------------------
// register new user

router.get('/new', (req, res) => {
  res.render('users/new');
});

// ----------------------------------------
// user logout

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// ----------------------------------------
// user login

router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post('/login', passport.authenticate(
  'local-login', ///// the stradegy to use
  {
    failureRedirect: '/users/login', ////wrong pass word, then stay at the page
    successRedirect: '/users/profile' /////if correct password , redirect
  }
));

// ----------------------------------------
// user profile

router.get('/profile', AuthService.restrict, (req, res) => {
    User
      .findByEmail(req.user.email)
      .then((user) => {
  res.render(
    'users/profile',
    { user: user }
  );
      })
      .catch(err => console.log('ERROR:', err));
  }
);

module.exports = router;

