import { Request, Response, NextFunction } from 'express'
import Http from '../Helpers/Http'
import BaseRouter from './BaseRouter'
import Home from './Home'
import Hadith from './Hadith'
import Ilmiyyah from './Ilmiyyah'
import CacheMiddleware from '../Middlewares/Cache'

// Create separate cache middleware instances for different routes
const booksCacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
  (req as any).cacheNamespace = 'books'
  CacheMiddleware(req, res, next)
}

const silsilahCacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
  (req as any).cacheNamespace = 'silsilah'
  CacheMiddleware(req, res, next)
}

class Routes extends BaseRouter {
  public routes() {
    // Re-enable caching with the proper namespace
    this.router.use('/books', booksCacheMiddleware, Hadith)
    this.router.use('/silsilah', silsilahCacheMiddleware, Ilmiyyah)
    this.router.use('/', Home)
    this.router.use('*', (req: Request, res: Response): void => {
      Http.send(res, {
        code: 404,
        message: 'Sorry, HTTP resource you are looking for was not found.',
        error: true
      })
    })
  }
}

export default new Routes().router