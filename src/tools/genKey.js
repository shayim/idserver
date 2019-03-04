// https: //github.com/panva/node-oidc-provider/blob/master/docs/keystores.md
// generate a new random key using node-jose and get the JWK representation of it.In this snippet a the required RS256 sig key is generated and a full JWKS is printed to the console.

const path = require('path')
const fs = require('fs')
const {
  createKeyStore
} = require('oidc-provider')
const keystore = createKeyStore()
keystore.generate('RSA', 2048, {
  alg: 'RS256',
  use: 'sig'
}).then(function () {
  fs.writeFileSync(path.resolve(__dirname, '..', 'config', 'oidc-provider', 'new.json'), JSON.stringify(keystore.toJSON(true)))
})
