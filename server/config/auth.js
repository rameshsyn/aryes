import passport from 'passport'
import LocalStrategy from 'passport-local'
import { Admin } from '../models'

// Local Strategy
const localStrategy = new LocalStrategy.Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  Admin.findOne({ email: email }, (err, user) => {
    if (err) {
      return done(err)
    }
    if (!user) {
      return done(null, false)
    }
    if (!user.compareWithHash(password, user.password)) {
      return done(null, false)
    }
    return done(null, user)
  })
})

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  Admin.findById(id, function (err, user) {
    done(err, user)
  })
})

passport.use(localStrategy)

export default passport
