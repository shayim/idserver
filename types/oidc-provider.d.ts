import { EventEmitter } from "events";
import { IncomingMessage, ServerResponse, Server } from "http";
import { Http2ServerRequest, Http2ServerResponse } from "http2";
import { Middleware } from "koa";

declare class Provider extends EventEmitter {
  static asKey(key: any, form: any, extras: any): any; // node-jose
  static asKeyStore(ks: any): any; // node-jose
  static createKeyStore(): any; // node-jose

  static useGot(): void;
  static useRequest(): void;

  constructor(issuer: string, setup: Provider.IConfiguration)

  issuer: string;

  cookieName(type: "session" | "interaction" | "resume" | "state"): string;

  httpOptions(values: any): any; // request headers

  initialize(setup: {
    adapter?
    clients: Provider.IClient[]
    keystore
  }): Promise<Provider>;

  interactionDetails(
    req: IncomingMessage | Http2ServerRequest
  ): Promise<Provider.ISession>; // Interaction Session Object

  interactionFinished(
    req: IncomingMessage | Http2ServerRequest,
    res: ServerResponse | Http2ServerResponse,
    result: any // Interaction Session.result
  ): Promise<void>;

  interactionResult(
    req: IncomingMessage | Http2ServerRequest,
    res: ServerResponse | Http2ServerResponse,
    result: any // Interaction Session.result
  ): Promise<string>; // Interaction.returnTo

  listen(args: any): Server;

  pathFor(name: string, opts: any): string;

  registerGrantType(
    name: string,
    handlerFactory: Function,
    params: string | Array<string> | Set<string>,
    dupes: string | Array<string> | Set<string>
  ): void;

  registerResponseMode(name: string, handler: Function): void;

  setProviderSession(
    req: IncomingMessage | Http2ServerRequest,
    res: ServerResponse | Http2ServerResponse,
    session: {
      account: string
      ts?: number
      remember?: boolean
      clientIds?: string[]
      meta?
    }
  ): Promise<Provider.ISession>;

  urlFor(name: string, opt: any): string;

  use(middleware: Middleware): void;
}

declare namespace Provider {
  interface IConfiguration {}
  interface IClient {}

  interface ISession {
    account: string;
    loginTs: number;
    returnTo: string;
    result;
    transient: boolean;
  }

  class AdapterTest {
    constructor(provider: any, accountId: any, clientId: any)
    provider: any;
    data: any;
    accessTokenDestroy(token: any): any;
    accessTokenFind(token: any): any;
    accessTokenSave(): any;
    authorizationCodeConsume(code: any): any;
    authorizationCodeFind(code: any): any;
    authorizationCodeInsert(): any;
    execute(): void;
  }

  namespace errors {
    class AccessDenied {
      static captureStackTrace(p0: any, p1: any): any;
      static prepareStackTrace: any;
      static stackTraceLimit: number;
      constructor(args: any)
      error_description: any;
    }
    class AuthorizationPending {
      static captureStackTrace(p0: any, p1: any): any;
      static prepareStackTrace: any;
      static stackTraceLimit: number;
      constructor(args: any)
      error_description: any;
    }
    class ConsentRequired {
      static captureStackTrace(p0: any, p1: any): any;
      static prepareStackTrace: any;
      static stackTraceLimit: number;
      constructor(args: any)
      error_description: any;
    }
    class ExpiredToken {
      static captureStackTrace(p0: any, p1: any): any;
      static prepareStackTrace: any;
      static stackTraceLimit: number;
      constructor(args: any)
      error_description: any;
    }
    class InteractionRequired {
      static captureStackTrace(p0: any, p1: any): any;
      static prepareStackTrace: any;
      static stackTraceLimit: number;
      constructor(args: any)
      error_description: any;
    }
    class InvalidClient {
      static captureStackTrace(p0: any, p1: any): any;
      static prepareStackTrace: any;
      static stackTraceLimit: number;
      constructor(detail: any)
    }
    class InvalidClientAuth {
      static captureStackTrace(p0: any, p1: any): any;
      static prepareStackTrace: any;
      static stackTraceLimit: number;
      constructor(detail: any)
    }
    class InvalidClientMetadata {
      static captureStackTrace(p0: any, p1: any): any;
      static prepareStackTrace: any;
      static stackTraceLimit: number;
      constructor(description: any)
    }
    class InvalidGrant {
      static captureStackTrace(p0: any, p1: any): any;
      static prepareStackTrace: any;
      static stackTraceLimit: number;
      constructor(detail: any)
    }
    class InvalidRequest {
      static captureStackTrace(p0: any, p1: any): any;
      static prepareStackTrace: any;
      static stackTraceLimit: number;
      constructor(description: any, code: any)
    }
    class InvalidRequestObject {
      static captureStackTrace(p0: any, p1: any): any;
      static prepareStackTrace: any;
      static stackTraceLimit: number;
      constructor(args: any)
      error_description: any;
    }
    class InvalidRequestUri {
      static captureStackTrace(p0: any, p1: any): any;
      static prepareStackTrace: any;
      static stackTraceLimit: number;
      constructor(args: any)
      error_description: any;
    }
    class InvalidScope {
      static captureStackTrace(p0: any, p1: any): any;
      static prepareStackTrace: any;
      static stackTraceLimit: number;
      constructor(description: any, scope: any)
    }
    class InvalidTarget {
      static captureStackTrace(p0: any, p1: any): any;
      static prepareStackTrace: any;
      static stackTraceLimit: number;
      constructor(args: any)
      error_description: any;
    }
    class InvalidToken {
      static captureStackTrace(p0: any, p1: any): any;
      static prepareStackTrace: any;
      static stackTraceLimit: number;
      constructor(detail: any)
    }
    class LoginRequired {
      static captureStackTrace(p0: any, p1: any): any;
      static prepareStackTrace: any;
      static stackTraceLimit: number;
      constructor(args: any)
      error_description: any;
    }
    class RedirectUriMismatch {
      static captureStackTrace(p0: any, p1: any): any;
      static prepareStackTrace: any;
      static stackTraceLimit: number;
      constructor(args: any)
      error_description: any;
    }
    class RegistrationNotSupported {
      static captureStackTrace(p0: any, p1: any): any;
      static prepareStackTrace: any;
      static stackTraceLimit: number;
      constructor(args: any)
      error_description: any;
    }
    class RequestNotSupported {
      static captureStackTrace(p0: any, p1: any): any;
      static prepareStackTrace: any;
      static stackTraceLimit: number;
      constructor(args: any)
      error_description: any;
    }
    class RequestUriNotSupported {
      static captureStackTrace(p0: any, p1: any): any;
      static prepareStackTrace: any;
      static stackTraceLimit: number;
      constructor(args: any)
      error_description: any;
    }
    class SessionNotFound {
      static captureStackTrace(p0: any, p1: any): any;
      static prepareStackTrace: any;
      static stackTraceLimit: number;
    }
    class SlowDown {
      static captureStackTrace(p0: any, p1: any): any;
      static prepareStackTrace: any;
      static stackTraceLimit: number;
      constructor(args: any)
      error_description: any;
    }
    class TemporarilyUnavailable {
      static captureStackTrace(p0: any, p1: any): any;
      static prepareStackTrace: any;
      static stackTraceLimit: number;
      constructor(args: any)
      error_description: any;
    }
    class UnauthorizedClient {
      static captureStackTrace(p0: any, p1: any): any;
      static prepareStackTrace: any;
      static stackTraceLimit: number;
      constructor(args: any)
      error_description: any;
    }
    class UnsupportedGrantType {
      static captureStackTrace(p0: any, p1: any): any;
      static prepareStackTrace: any;
      static stackTraceLimit: number;
      constructor(args: any)
      error_description: any;
    }
    class UnsupportedResponseMode {
      static captureStackTrace(p0: any, p1: any): any;
      static prepareStackTrace: any;
      static stackTraceLimit: number;
      constructor(args: any)
      error_description: any;
    }
    class UnsupportedResponseType {
      static captureStackTrace(p0: any, p1: any): any;
      static prepareStackTrace: any;
      static stackTraceLimit: number;
      constructor(args: any)
      error_description: any;
    }
    class WebMessageUriMismatch {
      static captureStackTrace(p0: any, p1: any): any;
      static prepareStackTrace: any;
      static stackTraceLimit: number;
      constructor(args: any)
      error_description: any;
    }
  }
}
export = Provider;
