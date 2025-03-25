# MPS - API

### Endpoint usage
- [x] `/books` = Returns the list of available Hadith Books.
- [x] `/books/{name}?range={number}-{number}` = Returns hadiths by range of number.
- [x] `/books/{name}/{number}` = Returns spesific hadith.
- [x] `/silsilah` = Returns all available silsilah topics.
- [x] `/silsilah/topic/{topicId}` = Returns all subtopics for a specific topic ID.
- [x] `/silsilah/subtopic/{subtopicId}` = Returns content (transkrip and audio URL) for a specific subtopic ID.

### Available Commands
- `yarn start` = run server.
- `yarn dev` = run develop server.
- `yarn crawl` = collect new data from the data source, then unifying it in one JSON file.

### LICENSE
MIT