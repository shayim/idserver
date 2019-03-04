import * as Provider from "oidc-provider";
import { get } from "config";

import { config, clients as clientsConfig } from "./config";
const keystore = require("./new.json").keys.concat(require("./old.json").keys);

function handleClientAuthErrors(
  err,
  { headers: { authorization }, oidc: { body, client } }
) {
  // if (err instanceof Provider.errors.InvalidClientAuth) {
  //   // save error details out-of-bands for the client developers, `authorization`, `body`, `client`
  //   // are just some details available, you can dig in ctx object for more.
  console.log(err);
  // }
}

export class OidcProvider {
  static provider: any;
  static initialize(): Promise<any> {
    const HOST = get<string>("express.host");
    const PORT = get<string>("express.port");

    const clients = clientsConfig;

    const oidc = new Provider(`http://${HOST}:${PORT}`, config);

    return oidc.initialize({ clients, keystore }).then(provider => {
      this.provider = provider;

      this.provider.use(async (ctx, next) => {
        console.log("*** oidc-provider PRE middleware ***\n", ctx.oidc);
        await next();
        console.log("*** oidc-provider POST middleware ***\n", ctx.oidc);
      });
      this.provider.on("grant.error", handleClientAuthErrors);
      this.provider.on("introspection.error", handleClientAuthErrors);
      this.provider.on("revocation.error", handleClientAuthErrors);

      return this.provider;
    });
  }
}
