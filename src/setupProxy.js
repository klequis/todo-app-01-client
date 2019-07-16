const proxy = require('http-proxy-middleware')

console.log('process.env.NODE_ENV', process.env.NODE_ENV)

module.exports = function(app) {
  const env = process.env.NODE_ENV
  if (!env === 'production') {
    app.use(proxy('/api', { target: 'http://localhost:3030/' }))
  } else {
    app.use(proxy('/api', { 
      target: 'https://api.klequis-todo.tk/',
      changeOrigin: true,
    }))
  }
}
