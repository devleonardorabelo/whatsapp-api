const { Router }     = require('express')
const passport       = require('passport')
const LocalStrategy  = require('passport-local').Strategy
const routes         = Router()

const AuthController = require('../controllers/AuthController')
const User           = require('../models/User')

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local-signin', new LocalStrategy(AuthController.signin))

passport.use('local-signup', new LocalStrategy({passReqToCallback : true},AuthController.signup))  

routes.get('/signin', (req, res) =>	res.render('auth/signin'))

routes.post('/signin', passport.authenticate('local-signin',{
    successRedirect: '/panel',
    failureRedirect: '/auth/signin',
}))

routes.get('/signup', (req, res) => res.render('auth/signup'))

routes.post('/signup', passport.authenticate('local-signup',{
    successRedirect: '/panel',
    failureRedirect: '/auth/signup',
}))

routes.get('/logout', (req, res) => {
	req.logout()
	return res.redirect('/auth/signin')
})

routes.get('/recover', (req, res) => res.render('auth/recover'))

routes.post('/recover', AuthController.recover)

routes.get('/recover/new', (req, res) => res.render('auth/newrecover'))

routes.post('/recover/new', AuthController.update)

module.exports = routes