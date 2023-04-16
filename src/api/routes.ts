// import * as FetchService from '../services/FetchService'
// import { cache } from '../utils/caching'

/**
 * Steps to add a new endpoint:
 *  - Add a route here
 *  - Add the corresponding function in the Controller, Service, and DAO
 *  - Add a function in api.js on the frontend
 */

// RESTful search
// https://stackoverflow.com/a/18933902/10415969

const routes = app => {
  // Hello World
  app.get('/hello', (req, res) => {
    res.json('Hello World!')
  })
}

export default routes
