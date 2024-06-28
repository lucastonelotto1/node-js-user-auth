import express from 'express'
import { PORT } from './config.js'
import { UserRepository } from './user-repository.js'

const app = express()

app.set('view engine', 'ejs')

app.use(express.json())

app.get('/', (req, res) => {
  res.render('example', { username: 'Lucas' })
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  console.log(username, password)

  try {
    const user = await UserRepository.login({ username, password })
    res.send({ user })
  } catch (error) {
    res.status(401).send({ error: error.message })
  }
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body
  console.log(username, password)

  try {
    const id = await UserRepository.create({ username, password })
    res.send({ id })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

app.post('/logout', (req, res) => {})

app.get('/protected', (req, res) => {})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
