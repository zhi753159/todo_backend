import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'

/**
 * Forbid not locked user to access and modify the operation form
 */
export default async (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;

  // verify request has token
  if (!token) {
    return res.status(401).json({ message: 'Invalid token ' });
  }

  // remove Bearer if using Bearer Authorization mechanism
  if (token.toLowerCase().startsWith('bearer')) {
    token = token.slice('bearer'.length).trim();
  }

  jwt.verify(token, config.APP_SESSION_SECRET, async (err: any, jwtPayload: any) => {
    if (err) {
      return res.status(401).json('Unauthorized')
    } else {
      req.user = global.TokenBuffer.find(search => search.token === token)
      if (!req.user) {
        return res.status(401).json('Unauthorized')
      }
      next()
    }
  })
}
