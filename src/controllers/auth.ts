import { Request, Response, NextFunction } from 'express'
import config from '../config'
import jwt from 'jsonwebtoken'
import { RegEx, validate } from 'validate-typescript'

/**
 * POST /login
 * Sign in using username and password.
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validate({
      username: RegEx(/^.*[a-z\d]{3}$/m),
      password: RegEx(/^.*[a-zA-Z\d]{3}$/m),
    }, req.body)

    const user = config.UserList.find(search => search.username === req.body.username)

    if (!user) {
      return res.status(400).json('User not exists')
    }

    if (req.body.password != user.password) {
      return res.status(401).json({})
    }

    console.log(`(${user.username}) has logged in the system`)
    const token = jwt.sign({ username: user.username }, config.APP_SESSION_SECRET);
    global.TokenBuffer.push({
      token,
      username: user.username,
      id: user.id,
    })

    res.status(200).json(`Login success. Please embbed the jwt token [bear ${token}] into Authorization header for testing`)
  } catch (err) {
    next(err)
  }
}

/**
 * GET /logout
 * Log out.
 */
export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json('Please login')
    }

    const index = global.TokenBuffer.indexOf(req.user)
    if (index !== -1) {
      global.TokenBuffer.splice(index, 1)
    }
    res.json('Log out success')
  } catch (err) {
    next(err)
  }
}

/**
 * GET /test
 * Get back username for testing only
 */
export const test = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json()
    }

    res.json(`login username: ${req.user.username}`)
  } catch (err) {
    next(err)
  }
}
