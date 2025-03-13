import { Request, Response } from 'express'
import Handler from './BaseHandler'

class HomeHandler extends Handler {

  public index(req: Request, res: Response): void {
    try {
      res.status(200).send({
        maintaner: 'Sutan Gading Fadhillah Nasution <sutan.gnst@gmail.com>',
        source: 'https://github.com/gadingnst/hadith-api',
        endpoints: {
          list: {
            pattern: 'https://hadith-mps.vercel.app/books',
            description: 'Returns the list of available Hadith Books.'
          },
          hadith: {
            pattern: 'https://hadith-mps.vercel.app/books/{name}?range={number}-{number}',
            example: 'https://hadith-mps.vercel.app/books/muslim?range=1-150',
            description: 'Returns hadiths by range of number. (Note: For performance reasons, max accepted range: 300)'
          },
          spesific: {
            pattern: 'https://hadith-mps.vercel.app/books/{name}/{number}',
            example: 'https://hadith-mps.vercel.app/books/bukhari/52',
            description: 'Returns spesific hadith.'
          }
        }
      })
    } catch (err) {
      this.handleHttpError(req, res, err as Error)
    }
  }

}

export default new HomeHandler()
