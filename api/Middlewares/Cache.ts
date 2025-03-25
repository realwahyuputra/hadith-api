import { Request, NextFunction, Response } from 'express'

// Use a specific cache for each namespace
const cache: Record<string, Record<string, any>> = {}

export default (req: Request, res: Response, next: NextFunction) => {
  // Use type assertion to access the cacheNamespace property
  const namespace = (req as any).cacheNamespace || 'default'
  const path = req.url
  const cacheKey = `${namespace}:${path}`
  
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate')

  // Initialize cache for this namespace if it doesn't exist
  if (!cache[namespace]) {
    cache[namespace] = {}
  }

  // Check if we have a cached response for this path within the namespace
  if (cache[namespace][path]) {
    return res.status(200).send(cache[namespace][path])
  }

  // Fix the sendResponse property error by using type assertion
  const originalSend = res.send
  
  // Override the send method to cache responses
  res.send = function(body: any) {
    cache[namespace][path] = body
    return originalSend.call(this, body)
  }
  
  next()
}