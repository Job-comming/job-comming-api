import { Handler } from 'express'

export const rootGet: Handler = (req, res) => {
  const { currentUser } = req.context
  if (!currentUser) {
    return null
  }
  res.send({
    name: 'job-comming-api',
    username: `${currentUser?.username}`,
  })
}
