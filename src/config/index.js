// const domain = 'klequis-todo.auth0.com'
import { testUserId } from './config.secret'
const config = {
  auth0: {
    // domain: domain,
    // audience: `https://${domain}/userinfo/`,
    // clientId: 'Hav4pitWXpDGkMaAxpj7rxHYuwAZovyI',
    domain: "klequis-todo.auth0.com",
    clientId: "Hav4pitWXpDGkMaAxpj7rxHYuwAZovyI",
    audience: "https://klequis-todo.tk",
    redirectUri: 'http://localhost:3000/',
    responseType: 'id_token',
    scope: 'openid profile email',
    testUserId: testUserId,
  },
  api: {
    apiRootUriDev: 'http://localhost:3030/',
    apiRootUrlProd: 'https://api.klequis-todo.tk/'
  }
}

export default config
