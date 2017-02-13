import { Router } from 'express'
import graphQLHttp from 'express-graphql'
import graphQLSchema from '../graphql'
const router = Router()

router.use('/graphql', graphQLHttp({
  schema: graphQLSchema,
  graphiql: process.env.NODE_ENV === 'development'
}))

router.get('*', (req, res) => res.render('index', {
  title: 'Aryes | Educational Institution management system',
  description: ''
}))

export default router
