// const proxy = require('http-proxy-middleware')



// module.exports = function(app) {
//   console.log('setupProxy: process.env.NODE_ENV', process.env.NODE_ENV)
//   const env = process.env.NODE_ENV
//   if (!env === 'production') {
//     app.use(proxy('/api', { target: 'http://localhost:3030/' }))
//   } else {
//     app.use(proxy('/api', { 
//       target: 'https://api.klequis-todo.tk/',
//       changeOrigin: true,
//     }))
//   }
// }

// module.exports = function(app) {

// }


// const customRouter = function(req) {
//   return 'https://api.klequis-todo.tk'
// }

// var options = {
//   target: 'http://localhost:8000',
//   router: customRouter
// }

// const myProxy = proxy(options)