import { Request, Response } from 'express'
import Handler from './BaseHandler'
import Ilmiyyah from '../Models/Ilmiyyah'

class IlmiyyahHandler extends Handler {
  
  public index(req: Request, res: Response): void {
    try {
      
      if (Ilmiyyah.getTopics().length === 0) {
        this.sendHttp(res, {
          code: 500,
          message: "Unable to load silsilah data. The data file might be corrupted.",
          error: true
        })
        return
      }
      
      const topics = Ilmiyyah.getTopics()
      
      this.sendHttp(res, {
        code: 200,
        message: `${topics.length} silsilah topics found.`,
        data: topics
      })
    } catch (err) {
      console.error('Error in IlmiyyahHandler.index:', err)
      this.handleHttpError(req, res, err as Error)
    }
  }

  public getSubtopicsByTopicId(req: Request, res: Response): void {
    const { topicId } = req.params
    
    try {
      const subtopics = Ilmiyyah.getSubtopicsByTopicId(topicId)
      
      if (!subtopics || subtopics.length === 0) {
        this.setHttpError({
          code: 404,
          message: `No subtopics found for topic ID: ${topicId}`
        })
      }
      
      this.sendHttp(res, {
        code: 200,
        message: `${subtopics.length} subtopics found for topic ID: ${topicId}`,
        data: {
          topic_id: topicId,
          subtopics
        }
      })
    } catch (err) {
      this.handleHttpError(req, res, err as Error)
    }
  }

  public getContentBySubtopicId(req: Request, res: Response): void {
    const { subtopicId } = req.params
    
    try {
      const content = Ilmiyyah.getContentBySubtopicId(subtopicId)
      
      if (!content) {
        this.setHttpError({
          code: 404,
          message: `Content not found for subtopic ID: ${subtopicId}`
        })
      }
      
      this.sendHttp(res, {
        code: 200,
        message: `Content for subtopic ID: ${subtopicId} sent.`,
        data: content
      })
    } catch (err) {
      this.handleHttpError(req, res, err as Error)
    }
  }
}

export default new IlmiyyahHandler() 