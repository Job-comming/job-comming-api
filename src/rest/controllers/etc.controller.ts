import { Handler } from 'express'

export const rootGet: Handler = (req, res) => {
  const session = req.session
  const user = req.user
  res.send({
    name: 'job-comming-api',
    username: `${req.context.currentUser}`,
    sessionID: `${session.id}`,
    user: `${user}`,
  })
}
