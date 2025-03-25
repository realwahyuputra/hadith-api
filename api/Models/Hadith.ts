import { readdirSync } from 'fs'

export type HadithContent = {
  number: number
  arab: string
  id: string
}

export type Hadith = {
  name: string
  id: string
  available: number
}

export type Hadiths = {
  [name: string]: HadithContent[]
}

const basePath = __dirname + '/../../books'
const allHadiths = readdirSync(basePath).reduce((acc, hadith) => {
  if (hadith.endsWith('.json') && hadith !== 'ilmiyyah.json') {
    const name = hadith.replace(/.json/gi, '')
    acc[name] = require(`../../books/${hadith}`)
  }
  return acc
}, {} as Hadiths)

class HadithModel {
  public available(): Hadith[] {
    return Object.entries(allHadiths).map(([haditsName, data]) => ({
      name: `HR. ${this.beautyName(haditsName)}`,
      id: haditsName,
      available: data.length
    }))
  }

  public getByName(haditsName: string): HadithContent[] {
    return allHadiths[haditsName]
  }
  
  public getByNumberRange(hadits: HadithContent[], from: number, to: number): HadithContent[] {
    const data: HadithContent[] = []
    if (!hadits) throw new Error(`Not Available`)
    if (from > to) {
      for (from; from >= to; from--) {
        data.push(hadits[from - 1])
      }
    } else {
      for (from; from <= to; from++) {
        data.push(hadits[from - 1])
      }
    }
    return data
  }

  public getByNumber(hadits: HadithContent[], number: number): HadithContent | undefined {
    return hadits.find(hadith => hadith.number === number)
  }

  public beautyName(haditsName: string): string {
    const words = haditsName.split('-')
    return words.reduce((acc, word) =>
      acc + ` ${word[0].toUpperCase() + word.substr(1).toLowerCase()}`, '').trim()
  }

  public searchInCollection(hadith: HadithContent[], keyword: string): HadithContent[] {
    if (!hadith) return [];
    
    const normalizedKeyword = keyword.toLowerCase();
    return hadith.filter(item => 
      item.arab.toLowerCase().includes(normalizedKeyword) || 
      item.id.toLowerCase().includes(normalizedKeyword)
    );
  }

  public searchAllCollections(keyword: string): Array<HadithContent & { collection: string }> {
    const results: Array<HadithContent & { collection: string }> = [];
    
    Object.entries(allHadiths).forEach(([collectionName, hadiths]) => {
      const matchingHadiths = this.searchInCollection(hadiths, keyword);
      
      // Add collection information to each result
      matchingHadiths.forEach(hadith => {
        results.push({
          ...hadith,
          collection: collectionName
        });
      });
    });
    
    return results;
  }
}

export default new HadithModel()
