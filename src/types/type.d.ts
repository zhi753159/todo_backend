namespace Express {
  interface Request {
    user: {
      username: string,
      token: string,
    },
  }
}