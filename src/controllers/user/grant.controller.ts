import { Controller, Get, Param, Req, Res } from 'routing-controllers'
import { Request, Response } from 'express'
import { OidcProvider } from '../../config/oidc-provider/oidc-provider'

@Controller()
export class GrantController {
  @Get('/interaction/:grant')
  async getGrant(
    @Param('grant') grant: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const detail = await OidcProvider.provider.interactionDetails(req)

    const result = {
      // authentication/login prompt got resolved, omit if no authentication happened, i.e. the user
      // cancelled
      login: {
        account: '7ff1d19a-d3fd-4863-978e-8cce75fa880c', // logged-in account id
        acr: 'abcd', // acr value for the authentication
        remember: false, // true if provider should use a persistent cookie rather than a session one
        ts: Date.now(), // unix timestamp of the authentication
      },

      // consent was given by the user to the client for this session
      consent: {
        rejectedScopes: [], // array of strings, scope names the end-user has not granted
        rejectedClaims: [], // array of strings, claim names the end-user has not granted
      },

      // meta is a free object you may store alongside an authorization. It can be useful
      // during the interactionCheck to verify information on the ongoing session.
      meta: {
        // object structure up-to-you
      },

      ['custom prompt name resolved']: {},
    }

    return await OidcProvider.provider.interactionFinished(req, res, result)
  }
}
