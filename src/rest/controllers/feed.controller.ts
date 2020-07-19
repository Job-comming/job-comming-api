import { Handler } from 'express'

export const getFeeds: Handler = async (req, res) => {
  const { feedService } = req.context
  const { currentCursor, pageSize } = req.query
  const feeds = await feedService.getFeeds({
    currentCursor: Number(currentCursor),
    pageSize: Number(pageSize),
  })
  console.log(feeds)
  res.send(feeds)
}

export const createFeed: Handler = async (req, res) => {
  const { feedService } = req.context
  const { content, type, tags } = req.body
  const feed = await feedService.createFeed({
    content,
    type,
    tags,
  })
  console.log(feed)
  res.send(feed)
}
