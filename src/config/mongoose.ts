import { connect } from "mongoose";
import { get } from "config";

export class Mongo {
  static start() {
    const uris = get<string>("mongo.uris");
    connect(
      uris,
      { promiseLibrary: global.Promise, useNewUrlParser: true, useCreateIndex: true }
    )
      .then(() => {
        console.log("SUCCESS: Mongodb connected");
      })
      .catch(error => {
        // TODO log error
        console.log("FAILED: mongodb connection FAILED", error);
      });
  }
}
