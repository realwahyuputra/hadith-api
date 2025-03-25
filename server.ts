import Express, { Application } from 'express'
import Cors from 'cors'
import Routes from './api/Routes'

// Clear module cache to ensure fresh imports
Object.keys(require.cache).forEach(function(key) {
  if (key.includes('api/')) {
    delete require.cache[key];
  }
});

class Server {
  public application: Application
  private port: number | string
  
  constructor() {
    this.port = process.env.PORT || 3300
    this.application = Express()
    this.plugins()
    this.routes()
  }
  
  private plugins(): void {
    this.application.use(Express.urlencoded({ extended: true }))
    this.application.use(Express.json())
    this.application.use(Cors())
  }
  
  private routes(): void {
    this.application.use(Routes)
  }
  
  public run(): void {
    if (process.env.NODE_ENV !== 'production') {
      this.application.listen(this.port, () => {
        console.log(`Server listening on http://localhost:${this.port}`)
      })
    }
  }
}

// Create server instance
const server = new Server();
// Run the server in non-production environments
server.run();
// Export the Express application instance for Vercel
export default server.application;
