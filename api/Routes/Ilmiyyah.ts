import Ilmiyyah from '../Handlers/Ilmiyyah'
import Router from './BaseRouter'

class IlmiyyahRoute extends Router<typeof Ilmiyyah> {
  constructor() {
    super(Ilmiyyah)
  }

  public routes() {
    this.router.get('/', this.bindHandler(Ilmiyyah.index))
    this.router.get('/topic/:topicId', this.bindHandler(Ilmiyyah.getSubtopicsByTopicId))
    this.router.get('/subtopic/:subtopicId', this.bindHandler(Ilmiyyah.getContentBySubtopicId))
  }
}

export default new IlmiyyahRoute().router 