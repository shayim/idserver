import { IClient, IConfiguration } from "oidc-provider";

export const clients: IClient[] = [
  {
    client_id: "miasystem",
    client_secret: "miasystem",
    grant_types: ["implicit"],
    response_types: ["id_token"],
    redirect_uris: ["https://example.org:5858"],
    token_endpoint_auth_method: "none",
  },
  // {
  //   client_id: 'trusted_app',
  //   client_secret: 'trusted_app',
  //   grant_types: ['client_credentials'],
  //   redirect_uris: [],
  //   response_types: [],
  // },
];

export const config: IConfiguration = {
  features: {
    backchannelLogout: true,
    devInteractions: false,
    claimsParameter: true,
    // clientCredentials: true,
    discovery: true,
    introspection: true,
    sessionManagement: true,
    registration: { initialAccessToken: true },
  },
  formats: { default: "opaque" },
  claims: {
    email: ["email", "email_verified"],
    phone: ["phone_number", "phone_number_verified"],
    profile: [
      "birthdate",
      "family_name",
      "gender",
      "given_name",
      "locale",
      "middle_name",
      "name",
      "nickname",
      "picture",
      "preferred_username",
      "profile",
      "updated_at",
      "website",
      "zoneinfo",
    ],
  },
  scopes: ["api1"],
  async findById(ctx, id) {
    console.log("**** Provder context ****\n", ctx);
    return {
      accountId: id,
      claims: (use, scope) => ({
        sub: id,
      }),
    };
  },
  cookies: {
    keys: ["abcde", "fghij"],
    long: {
      secure: false,
    },
  },
  acrValues: ["hello", "world"],
};
