import { Request, Response } from 'express'
import Handler from './BaseHandler'

class HomeHandler extends Handler {

  public index(req: Request, res: Response): void {
    try {
      res.status(200).send({
        maintaner: 'MPS Team',
        source: 'https://mesinpencarisunnah.com',
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
          },
          search: {
            pattern: 'https://hadith-mps.vercel.app/books/search?keyword={keyword}',
            example: 'https://hadith-mps.vercel.app/books/search?keyword=prayer',
            description: 'Search for hadiths containing a specific keyword across all collections.'
          },
          searchInCollection: {
            pattern: 'https://hadith-mps.vercel.app/books/{name}/search?keyword={keyword}',
            example: 'https://hadith-mps.vercel.app/books/bukhari/search?keyword=prayer',
            description: 'Search for hadiths containing a specific keyword within a specific collection.'
          },
          silsilahTopics: {
            pattern: 'https://hadith-mps.vercel.app/silsilah',
            description: 'Returns all available silsilah topics.'
          },
          silsilahSubtopics: {
            pattern: 'https://hadith-mps.vercel.app/silsilah/topic/{topicId}',
            description: 'Returns all subtopics for a specific topic ID.'
          },
          silsilahContent: {
            pattern: 'https://hadith-mps.vercel.app/silsilah/subtopic/{subtopicId}',
            description: 'Returns content (transkrip and audio URL) for a specific subtopic ID.'
          }
        }
      })
    } catch (err) {
      this.handleHttpError(req, res, err as Error)
    }
  }

}

export default new HomeHandler()
