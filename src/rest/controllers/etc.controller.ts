import { Handler } from 'express'

export const rootGet: Handler = (req, res) => {
  res.send({
    name: 'job-comming-api',
    username: `${req.context.currentUser}`,
  })
}
