namespace Express {
  interface Request {
    user: {
      username: string,
      token: string,
      id: number,
    },
    models: any,
  }
}