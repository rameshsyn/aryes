import { Router } from 'express'

const router = Router()

router.get('*', (req, res) => res.render('index', {
  title: 'Aryes | An Educational Institution management system',
  description: ''
}))

export default router
