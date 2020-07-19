import { Handler } from 'express'

export const updateUserInfo: Handler = async (req, res) => {
  const { userInfoService } = req.context
  const { id, input } = req.body
  const userInfo = await userInfoService.updateUserInfo(id, input)
  res.send(userInfo)
}
