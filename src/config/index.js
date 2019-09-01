// const domain = 'klequis-todo.auth0.com'
import { testUserId } from './config.secret'
const config = {
  auth0: {
    // domain: 'klequis-todo.auth0.com',
    domain: domain,
    audience: 'https://klequis-todo.tk',
    clientId: 'Hav4pitWXpDGkMaAxpj7rxHYuwAZovyI',
    redirectUri: 'http://localhost:3000/',
    responseType: 'id_token',
<<<<<<< HEAD
    scope: 'openid profile email'
=======
    scope: 'openid profile email',
    testUserId: testUserId,
>>>>>>> dev
  },
  api: {
    apiRootUriDev: 'http://localhost:3030/',
    apiRootUrlProd: 'https://api.klequis-todo.tk/'
  }
}

export default config


// const domain = 'klequis-todo.auth0.com'

// const config = {
//   auth0: {
//     // domain: domain,
//     // audience: `https://${domain}/userinfo/`,
//     // clientId: 'Hav4pitWXpDGkMaAxpj7rxHYuwAZovyI',
//     domain: "klequis-todo.auth0.com",
//     clientId: "Hav4pitWXpDGkMaAxpj7rxHYuwAZovyI",
//     audience: "https://klequis-todo.tk",
//     redirectUri: 'http://localhost:3000/',
//     responseType: 'id_token',
//     scope: 'openid profile'
//   }
// }

// export default config
