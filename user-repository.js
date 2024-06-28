import DBLocal from 'db-local'
import bcrypt from 'bcrypt'

import crypto from 'node:crypto'
import { SALT_ROUNDS } from './config'

const { Schema } = new DBLocal({ path: './db' })

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
})

export class UserRepository {
  static create ({ username, password }) {
    // Vaidaciones de username
    if (typeof username !== 'string') throw new Error('Username must be a string')
    if (username.length < 3) throw new Error('Username must be at least 4 characters long')

    if (typeof password !== 'string') throw new Error('Password must be a string')
    if (password.length < 3) throw new Error('Password must be at least 4 characters long')

    // Asegurar que el username no existe
    const user = User.findOne({ username })
    if (user) throw new Error('Username already exists')

    const id = crypto.randomUUID()
    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS)

    User.create({
      _id: id,
      username,
      password
    }).save()

    return id
  }

  static login ({ username, password }) {}
}
