import "reflect-metadata";
import { Mongo } from "./config/mongoose";
import { Express } from "./config/express";
import { get } from "config";
import { OidcProvider } from "./config/oidc-provider/oidc-provider";

const HOST = get<string>("express.host");
const PORT = get<number>("express.port");
const app = Express.initialize();

Mongo.start();

OidcProvider.initialize()
  .then(oidc => {
    app.use(oidc.callback);
    app.listen(PORT, () => {
      console.log(`idpserver is listening at ${HOST}:${PORT}`);
    });
  })
  .catch(error => {
    console.log("*** ERROR OIDC PROVIDER ***\n", error);
  });
