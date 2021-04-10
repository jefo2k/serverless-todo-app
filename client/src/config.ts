// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'r28wrme5x4'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-2.amazonaws.com/dev`
// export const apiEndpoint = 'http://localhost:3000/dev'

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-8d9j0nrm.us.auth0.com',            // Auth0 domain
  clientId: 'XMmnj7F6beXnYxRGA4gvd9260h4nJ3Mh',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
