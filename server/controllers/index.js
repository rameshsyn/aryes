import { Router } from 'express'
import graphQLHttp from 'express-graphql'
import graphQLSchema from '../graphql'
import passport from '../config/auth'
const router = Router()

router.use(passport.initialize())

router.use(passport.session())

router.use('/graphql', graphQLHttp({
  schema: graphQLSchema,
  graphiql: process.env.NODE_ENV === 'development'
}))

router.post('/login',
  passport.authenticate('local',
    { successRedirect: '/dashboard',
      failureRedirect: '/',
      failureFlash: false
    })
)

function isAuthenticated (req, res, next) {
  if (req.user) {
    return next()
  }
  res.redirect('/')
}
router.get('/', (req, res) => res.render('index', {
  title: 'Aryes | Educational Institution management system',
  description: ''
}))

router.get('*', (req, res) => res.render('index', {
  title: 'Aryes | Educational Institution management system',
  description: ''
}))

export default router
