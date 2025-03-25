import { readdirSync, readFileSync } from 'fs'
import path from 'path'

export type SubtopicContent = {
  topic: string
  subtopic: string
  audio: string
  transkrip: string
  topic_id: string
  subtopic_id: string
}

export type IlmiyyahData = SubtopicContent[]

// Use a safer method to parse the JSON file
let ilmiyyahData: IlmiyyahData = [];
const ilmiyyahPath = path.join(__dirname, '/../../books/ilmiyyah.json')

try {
  const fileContents = readFileSync(ilmiyyahPath, 'utf8')
  ilmiyyahData = JSON.parse(fileContents)
} catch (error) {
  console.error('Error parsing ilmiyyah.json file:', error)
  // Initialize with empty array on error
  ilmiyyahData = []
}

class IlmiyyahModel {
  public getAll(): IlmiyyahData {
    return ilmiyyahData
  }

  public getTopics(): { topic: string, topic_id: string }[] {
    const uniqueTopics = new Map<string, { topic: string, topic_id: string }>()
    
    ilmiyyahData.forEach(item => {
      if (!uniqueTopics.has(item.topic_id)) {
        uniqueTopics.set(item.topic_id, {
          topic: item.topic,
          topic_id: item.topic_id
        })
      }
    })
    
    return Array.from(uniqueTopics.values())
  }

  public getSubtopicsByTopicId(topicId: string): { subtopic: string, subtopic_id: string }[] {
    return ilmiyyahData
      .filter(item => item.topic_id === topicId)
      .map(item => ({
        subtopic: item.subtopic,
        subtopic_id: item.subtopic_id
      }))
  }

  public getContentBySubtopicId(subtopicId: string): SubtopicContent | null {
    const content = ilmiyyahData.find(item => item.subtopic_id === subtopicId)
    return content || null
  }
}

export default new IlmiyyahModel() 