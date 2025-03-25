import Hadith from '../Handlers/Hadith'
import Router from './BaseRouter'

class HadithRoute extends Router<typeof Hadith> {
  constructor() {
    super(Hadith)
  }

  public routes() {
    this.router.get('/', this.bindHandler(Hadith.index))
    this.router.get('/search', this.bindHandler(Hadith.searchByKeyword))
    this.router.get('/:name', this.bindHandler(Hadith.getByName))
    this.router.get('/:name/search', this.bindHandler(Hadith.searchByKeyword))
    this.router.get('/:name/:number', this.bindHandler(Hadith.getByNumber))
  }
}

export default new HadithRoute().router